<template>
<div class="hbox flex1">
    <el-row class="flex1 card-con" >
        <el-col v-cloak v-for="wall in walls" :key="wall.id" :xs="6" :sm="6" :md="6" :lg="6">
            <div class="card" @click="viewDetail(wall)" style="padding:10px;border:1px solid #d5d5d5;border-radius:3px;margin:10px;cursor:pointer">
                <div class="title" v-text="wall.title"></div>
                <div class="time" v-text="wall.createdTime"></div>
                <div class="img" v-if="wall.filePath">
                    <img :src="wall.filePath" alt="">
                </div>
                <div class="subtitle" v-text="wall.subtitle"></div>
                <div class="readline">
                    <span>阅读全文</span><span style="padding-left:25px;color:#007AFF" v-text="wall.statusName"></span><i class="el-icon-arrow-right zhishi"></i>
                </div>
            </div>
        </el-col>
        <el-col v-cloak v-if="!lastPage && loaded"  :xs="6" :sm="6" :md="6" :lg="6">
            <div style="text-align:center;height:150px;line-height:150px;"><el-button @click="loadMore">查看更多</el-button></div>
        </el-col>
        <div v-if="walls.length==0 && loaded" class="empty">您还没有上传过宣传墙</div>
    </el-row>
</div>
</template>
<script>
export default{
    mounted:function(){
        var me=this;
        me.loadData();
    },
    data() {
        return {
            page:1,
            lastPage:false,
            loaded:false,
            walls:[]
        }
    },
    methods:{
        viewDetail:function(wall){
            this.$router.push({
                name:'NewWall',
                params:{
                    wallId:wall.id,
                    state:wall.state
                }
            });
        },
        loadData:function(){
            var me=this;
            me.$http.get('wall/getWalls',{
                page:me.page,
                pageSize:15,
                companyId:me.$cookie.get('company-id')
            },function(res){
                me.lastPage = res.data.last;
                for(var i=0,j = res.data.content.length;i<j;i++){
                    me.walls.push(res.data.content[i]);
                }
                me.loaded = true;
            });
        },
        loadMore:function(){
            var me=this;
            me.page++;
            me.loadData();
        }
    }
}    
</script>
<style lang="css" scoped>
  .card-con{
    
  }
  .card-con .card{
      background-color:#fff;
      border-radius:3px;
      border:1px solid #ddd;
      padding:10px;
  }
  .card-con .card div{
      padding-bottom:6px;
  }
  .card-con .card .title{
    font-size:20px;
    color:#000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-con .card .time{
      font-size:14px;
      color:#999;
  }
  .card .subtitle{
      font-size:14px;
      color:#999;
  }
  .card-con .card .img{
      width:100%;
  }
  .card-con .card .img img{
      width:100%;
  }
  .card-con .card .readline{
      border-top:1px solid #ddd;
      font-size:14px;
      padding:7px 0 0 0;
      position:relative;
  }
  .card-con .card .readline i{
      position:absolute;
      right:12px;
      top:10px;
      color:#999;
  }
</style>