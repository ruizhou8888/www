<template>
    <div class="company vbox flex1">
        <div style="padding:5px 0">
            <el-input v-model="search.name" @keyup.enter.native="loadData" placeholder="输入名称搜索公司"></el-input>
        </div>
        <base-table
            ref="companyTable"
            url='company/getCompanys'
            :columns="columns"
            :params="search"
        ></base-table>
    </div>
</template>
<script>
import BaseTable from './BaseTable.vue'
export default{
    components:{
        BaseTable
    },
    data(){
        return {
            selects:[],
            search:{
                name:''
            },
            columns:[
                {label:'企业名称',prop:'name'}
            ]
        }
    },
    methods:{
        loadData(){
           this.$refs['companyTable'].loadData();
        },
        clearSelect(){
            this.$refs['companyTable'].clearSelect();
        },
        getSelectRows(){
            var arry = this.$refs['companyTable'].getSelects();
            var ids=[],names=[];
            arry.forEach(function(item) {
                ids.push(item.id);
                names.push(item.name);
            });
            return {
                ids:ids,
                names:names.toString()
            }
        }
    }
}
</script>
<style lang="css" scoped>
    .company{
        width:100%;
    }
</style>