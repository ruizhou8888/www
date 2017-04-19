<template>
<el-select v-model="value" 
      :filterable="filterable"
      :clearable="clearable" 
      :disabled="disabled" 
      placeholder="请选择" style="width:100%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.name"
      :value="item.value"
      @change="select">
    </el-option>
</el-select>
</template>
<script>
export default{
    props:{
        filterable:{
            type:Boolean,default:true
        },
        clearable:{
            type:Boolean,default:true
        },
        disabled:{
            type:Boolean,default:false
        },
        val:{
            type:[String,Number]
        },
        type:{
            type:String,default:'constant'
        },
        url:{
            type:String,default:'constantDtls/queryConstantDtls'
        },
        params:{
            type:Object,default:function(){return {}}
        }
    },
    beforeMount () {
      this.loadData();  
    },
    data(){
        var me=this;
        return {
            options:[],
            value:me.val
        }
    },
    methods:{
        select(val){
            this.$emit('select',val);
        },
        loadData(){
            var me=this;
            if(me.type=='constant'){
                me.loadConstant();
            }else{

            }
        },
        loadConstant(){
            var me= this;
            me.$http.get(me.url,me.params)
            .then(function(res){
                if(res.data.code==0){
                    me.options = res.data.data;
                }else{
                    console.log('select查询错误');
                    return;
                }
            })
        }
    }
}
</script>
<style scoped>
    
</style>