<template>
    <div class="hbox flex1">
        <div class="constant-type vbox">
            <div class="tool-bar">
                <div class="option">
                    <span><el-button @click="openTypeDialog" type="text" icon="plus">添加</el-button></span>
                    <span><el-button @click="delTypeBatch" type="text" icon="delete" :disabled="typeSelects.length==0">删除</el-button></span>
                </div>
                <div class="search">
                    <span><el-input @keyup.enter.native="loadTypeData" type="text" icon="search" v-model="param.content" placeholder="编码，名称查询"></el-input></span>
                </div>
            </div>
            <base-table
                ref="constantTypeTable"
                url='constant/getConstantType'
                :params="param"
                :columns="columns"
                @selectChange="typeSelect"
                @rowClick="typeClick"
                @rowDblClick="typeRowDblClick"
            ></base-table>
        </div>
        <div class="vbox flex1">
            <div class="tool-bar">
                <div class="option">
                    <span><el-button :disabled="constant.typeNo.length==0" @click="openConstDialog" type="text" icon="plus">添加</el-button></span>
                    <span><el-button @click="delConstBatch" type="text" icon="delete" :disabled="constSelects.length==0">删除</el-button></span>
                </div>
            </div>
            <base-table
                ref="constantTable"
                url='constant/findConstantByTypeNo'
                :columns="constantColumns"
                @selectChange="constSelect"
                :params="constant"
                :autoLoad="false"
                @rowDblClick="constRowDblClick"
            ></base-table>
        </div>
        <el-dialog title="常量类型维护" v-model="showTypeDialog" size="tiny">
            <el-form ref="typeForm" :rules="typeRules" :model="constType" label-width="120px">
                <el-form-item label="常量编码" prop="typeNo">
                    <el-input :disabled="isEditType" placeholder="输入常量编码" v-model="constType.typeNo"></el-input>
                </el-form-item>
                <el-form-item label="常量类别名称" prop="name">
                    <el-input placeholder="输入常量类别名称" v-model="constType.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="saveConstType">确 定</el-button>
                <el-button @click="showTypeDialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="常量维护" v-model="showConstDialog" size="tiny">
            <el-form ref="constForm" :rules="constRules" :model="constant" label-width="120px">
                <el-form-item label="所属常量类型" >
                    <el-input disabled placeholder="" v-model="constant.typeNo"></el-input>
                </el-form-item>
                <el-form-item label="常量值" prop="value">
                    <el-input :disabled="isEditConst" placeholder="输入常量值" v-model="constant.value"></el-input>
                </el-form-item>
                <el-form-item label="常量名称" prop="name">
                    <el-input placeholder="输入常量名称" v-model="constant.name"></el-input>
                </el-form-item>
                <el-form-item label="排序" >
                    <el-input-number placeholder="排序号" v-model="constant.sort" @change="sortChange" :min="1" ></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="saveConst">确 定</el-button>
                <el-button @click="showConstDialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import BaseTable from '../common/BaseTable.vue'

export default{
    components:{
        BaseTable
    },
    data(){
        return {
            showTypeDialog:false,
            showConstDialog:false,
            isEditType:false,
            isEditConst:false,
            param:{
                content:''
            },
            columns:[
                {label:'常量编码',prop:'typeNo'},
                {label:'常量类型',prop:'name'}
            ],
            constantColumns:[
                {label:'常量KEY',prop:'value',width:150},
                {label:'常量内容',prop:'name'}
            ],
            typeRules:{
                typeNo: [
                    { required: true, message: '请输入常量编码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入常量类型', trigger: 'blur' }
                ]
            },
            constRules:{
                value: [
                    { required: true, message: '请输入常量值', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入常量名称', trigger: 'blur' }
                ]
            },
            constType:{
                typeNo:'',
                name:''
            },
            constant:{
                typeNo:'',
                name:'',
                value:'',
                sort:1
            },
            typeSelects:[],
            constSelects:[]
        }
    },
    mounted(){
        this.defaultConstType = JSON.parse(JSON.stringify(this.$data.constType));  
        this.defaultConstant = JSON.parse(JSON.stringify(this.$data.constant));
    },
    methods:{
        openTypeDialog(){
            var me=this;
            me.isEditType = false;
            if(me.$refs['typeForm']){
                me.$refs['typeForm'].resetFields();
            }
            me.constType = Object.assign(me.$data.constType, me.defaultConstType);
            me.showTypeDialog = true;
        },
        openConstDialog(){
            var me=this;
            me.isEditConst = false;
            if(me.$refs['constForm']){
                me.$refs['constForm'].resetFields();
            }
            me.constant = Object.assign(me.$data.constant, me.defaultConstant);
            me.constant.typeNo = me.constType.typeNo;
            me.showConstDialog = true;
        },
        typeRowDblClick(row){
            if(this.$refs['typeForm']){
                this.$refs['typeForm'].resetFields();
            }
            var tempData = Object.assign({},row);
            this.constType = tempData;
            this.isEditType = true;
            this.showTypeDialog = true;
        },
        constRowDblClick(row){
            if(this.$refs['constForm']){
                this.$refs['constForm'].resetFields();
            }
            var tempData = Object.assign({},row);
            this.constant = tempData;
            this.isEditConst = true;
            this.showConstDialog = true;
        },
        loadTypeData(){
            this.$refs.constantTypeTable.loadData();
        },
        typeClick(row){
            this.constType.typeNo = row.typeNo;
            this.constant.typeNo = row.typeNo;
            this.$refs.constantTable.loadData();
        },
        typeSelect(rows){
            this.typeSelects = rows;
        },
        constSelect(rows){
            this.constSelects = rows;
        },
        sortChange(val){
            this.constant.sort = val;
        },
        saveConstType(){
            var me =this;
            me.$refs['typeForm'].validate((valid) => {
                if (valid) {
                    me.$http.post('constant/saveConstType',me.constType,function(res){
                        me.loadTypeData();
                        me.showTypeDialog = false;
                    })
                } else {
                    return false;
                }
            });
        },
        delTypeBatch(){
            var me =this;
            me.$confirm('确定要删除选中项吗？', '提示', {
                type: 'warning'
            }).then(() => {
                me.$http.post('constant/delConstantType',{
                    ids:JSON.stringify(me.typeSelects)
                },function(res){
                    me.$refs.constantTypeTable.loadData();
                    me.constType.typeNo = '';
                    me.$refs.constantTable.loadData();
                    me.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                });
            });
        },
        delConstBatch(){
            var me =this;
            me.$confirm('确定要删除选中项吗？', '提示', {
                type: 'warning'
            }).then(() => {
                me.$http.post('constant/delConstant',{
                    ids:JSON.stringify(me.constSelects)
                },function(res){
                    me.$refs.constantTable.loadData();
                    me.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                });
            });
        },
        saveConst(){
            var me =this;
            me.$refs['constForm'].validate((valid) => {
                if (valid) {
                    me.$http.post('constant/saveConstant',me.constant,function(res){
                        me.$refs.constantTable.loadData();
                        me.showConstDialog = false;
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="css" scoped>
    .constant-type{
        width:40%;
        border-right:10px solid #EEF1F6;
    }
</style>