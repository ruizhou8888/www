<template>
<div class="vbox flex1">
 <el-table
    v-loading.body="loading"
    class="flex1"
    highlight-current-row
    :data="data"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="selectionChange"
    @row-dblclick="rowDblClick"
    @row-click="rowClick">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <!--循环columns数组-->
    <el-table-column 
        v-for="c in columns"
        :key="c.prop"
        :label="c.label"
        :width="c.width"
        :prop="c.prop"
        show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
  <div style="padding:20px" v-if="enablePage">
    <el-pagination
        style="float:right"
        @size-change="sizeChange"
        @current-change="curPageChange"
        :current-page="startPage"
        :page-sizes="pageSizes"
        :page-size="pageNums"
        layout="total,sizes,prev,next,jumper"
        :total="total">
    </el-pagination>
    <div style="clear:both"></div>
  </div>
</div>
</template>
<script>
 export default{
    data() {
      return {
        loading:false,
        data: [],
        total:0,
        selection: [],
        pageSizes:[15,20,25,30],
        startPage:this.page,
        pageNums:this.pageSize
      }
    },
    mounted(){
      var me=this;
      if(me.autoLoad){
        me.loading = true;
        me.loadData();
      }
    },
    props:{
        url:{type:String,required:true},
        columns:{
            type:Array,required:true,default:[]
        },
        pageSize:{
            type:Number,default:15
        },
        page:{
            type:Number,default:1
        },
        enablePage:{
            type:Boolean,default:true
        },
        params:{
           type:Object,default:function(){return {}}
        },
        autoLoad:{
           type:Boolean,default:true
        }
    },
    methods: {
      selectionChange(val) {
        this.selection = val;
        this.$emit('selectChange',val)
      },
      rowDblClick(row,event){
        this.$emit('rowDblClick',row)
      },
      rowClick(row,event){
        this.$emit('rowClick',row)
      },
      clearData(){
        this.data=[];
      },
      sizeChange(val){
        this.pageNums = val;
        this.loadData();
      },
      curPageChange(val){
        this.startPage = val;
        this.loadData();
      },
      loadData(){
        var me = this;
        if(me.enablePage){
          me.params.page = me.startPage;
          me.params.pageSize = me.pageNums;
        }
        me.loading = true;
        me.$http.get(me.url,me.params,function(res){
          if(res.data){
            me.data = res.data.content;
            me.total = res.data.totalElements;
          }
          me.loading = false;
        })
      },
      getDatas(){
        return this.data;
      },
      getSelects(){
        return this.selection;
      }
    }
 }   
</script>
<style scoped>
    
</style>