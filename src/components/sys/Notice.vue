<template>
<div class="vbox flex1">
    <div class="tool-bar">
        <div class="option">
            <span><el-button @click="openAdd" type="text" icon="plus">添加</el-button></span>
            <span><el-button @click="batDel" :disabled="selectNotices.length==0" type="text" icon="delete" >删除</el-button></span>
        </div>
    </div>
    <base-table
        ref="noticeTable"
        url='notice/getNotices'
        :columns="columns"
        :enablePage="false"
        @rowDblClick="rowDblClick"
        @selectChange="noticeSelect"
    >

    </base-table>
    <!--<el-dialog class="notice" v-model="showDetail" size="small">
        <h2 style="text-align:center" v-html="select.title"></h2>
        <div class="notice-con" v-html="select.content" style="height:550px;overflow-y:auto"></div>
    </el-dialog>-->
    <el-dialog title="新增通知" v-model="showAdd" size="small"  :top="'5%'">
        <el-form ref="noticeForm" :model="notice" :rules="rules" label-width="90px">
            <el-form-item label="标题" prop="title">
                <el-input placeholder="请输入标题" v-model="notice.title"></el-input>
                <el-checkbox v-model="sendType">发送给所有人</el-checkbox>
                <el-button type="text" :disabled="sendType" @click="openChoseCompany" icon="plus" style="margin-left:30px;">发送给</el-button>
                <div v-if="companyNames.length>0" style="color:#999;overflow:hidden" v-text="companyNames"></div>
            </el-form-item>
            <el-form-item label="通知内容" prop="content">
                <v-editor 
                    :input-content="content"
                    v-model="notice.content"
                ></v-editor>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="saveNotice">保存并发送</el-button>
            <el-button @click="showAdd = false">取 消</el-button>
        </span>
    </el-dialog>
    <el-dialog title="选择公司" v-model="choseCompany" size="tiny">
         <chose-company ref="choseCompany"></chose-company>
         <span slot="footer">
            <el-button type="primary" @click="saveChoses">确 定</el-button>
            <el-button @click="choseCompany = false">取 消</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import BaseTable from '../common/BaseTable.vue'
import ChoseCompany from '../common/ChoseCompany.vue'
import editor from '../common/Editor.vue'

export default{
    components:{
        BaseTable,
        ChoseCompany,
        'v-editor':editor
    },
    mounted() {
        this.defaultNotice = JSON.parse(JSON.stringify(this.$data.notice));
    },
    watch:{
        'notice.sendType':function(){
            return !this.sendType ? this.notice.sendType==1 : this.notice.sendType==0;
        }
    },
    data(){
        return {
            showDetail:false,
            showAdd:false,
            choseCompany:false,
            columns:[
                {label:'标题',prop:'title'},
                {label:'发送时间',prop:'createdTime',width:300},
            ],
            sendType:true,
            notice:{
                id:'',
                title:'',
                sendType:0,
                content:''
            },
            content:'',
            rules:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur,change' }
                ],
                content: [
                    { required: true, message: '请输入通知内容', trigger: 'change' }
                ]
            },
            selectNotices:[],
            companyIds:[],
            companyNames:''
        }
    },
    methods:{
        rowDblClick(row){
            if(this.$refs['noticeForm']){
                this.$refs['noticeForm'].resetFields();
            }
            var tempData = Object.assign({},row);
            this.notice = tempData;
            this.content = tempData.content;
            this.showAdd = true;
        },
        noticeSelect(val){
            this.selectNotices = val;
        },
        openAdd(){
            this.showAdd =true;
            if(this.$refs['noticeForm']){
                this.$refs['noticeForm'].resetFields();
            }
            this.notice = Object.assign(this.$data.notice, this.defaultNotice);
        },
        openChoseCompany(){
            this.choseCompany = true;
            if(this.$refs['choseCompany']){
                this.$refs['choseCompany'].clearSelect();
            }
        },
        changeInput(content){
            this.notice.content = content;
        },
        saveChoses(){
            var companys = this.$refs['choseCompany'].getSelectRows();
            this.companyIds = companys.ids;
            this.companyNames = companys.names;
            this.choseCompany = false;
        },
        saveNotice(){
            var me=this;
            me.$refs['noticeForm'].validate((valid) => {
                if (valid) {
                    me.$http.post('notice/saveNotice',{
                        id:me.notice.id,
                        title:me.notice.title,
                        sendType:me.notice.sendType,
                        content:me.notice.content,
                        companyIds:me.companyIds,
                    },function(res){
                        me.$message({
                            message:'添加成功',
                            type:'success'
                        });
                        me.$refs['noticeTable'].loadData();
                        me.showAdd =false;
                    })
                } else {
                    return false;
                }
            });
        },
        batDel(){
            var me =this;
            var arry = [];
            me.selectNotices.forEach(function(item){
                arry.push(item.id);
            });
            me.$confirm('确定要删除选中项吗？', '提示', {
                type: 'warning'
            }).then(() => {
                me.$http.post('notice/delNotice',{
                    ids:JSON.stringify(arry)
                },function(res){
                    me.$message({
                        message:'删除成功',
                        type:'success'
                    });
                    me.$refs['noticeTable'].loadData();
                });
            });
        }
    }
}
</script>
<style lang="css" scoped>
    /*.notice-con {
        padding: 15px;
    }
    
    .notice > .el-dialog--small {
        padding: 30px 20px;
        color: #48576a;
        font-size: 14px;
        height: 550px !important;
        overflow: auto;
    }*/
</style>