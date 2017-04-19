<template>
    <div class="hbox flex1">
        <div class="constant-type vbox">
            <div class="tool-bar">
                <div class="option">
                    <span><el-button type="text" icon="plus">添加</el-button></span>
                    <span><el-button @click="delTypeBatch" type="text" icon="delete" :disabled="typeSelects.length==0">删除</el-button></span>
                </div>
                <div class="search">
                    <span><el-input @keyup.enter.native="loadData" type="text" icon="search" v-model="param.content" placeholder="编码，名称查询"></el-input></span>
                </div>
            </div>
            <base-table
                ref="constantTypeTable"
                url='constant/getConstantType'
                :params="param"
                :columns="columns"
                @selectChange="typeSelect"
                @rowClick="typeClick"
            ></base-table>
        </div>
        <div class="vbox flex1">
            <base-table
                ref="constantTable"
                url='constant/findConstantByTypeNo'
                :columns="constantColumns"
                :params="constType"
                :autoLoad="false"
            ></base-table>
        </div>
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
            constType:{
                typeNo:'',
                name:''
            },
            typeSelects:[]
        }
    },
    methods:{
        loadData(){
            this.$refs.constantTypeTable.loadData();
        },
        typeClick(row){
            this.constType.typeNo = row.typeNo;
            this.$refs.constantTable.loadData();
        },
        typeSelect(rows){
            this.typeSelects = rows;
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