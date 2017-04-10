<template>
  <div id="app" class="vbox">
    <div class="top hbox">
      <div class="logo">海里巴巴</div>
      <div class="center">
        <el-input
          placeholder="搜索功能"
          icon="search"
          v-model="searchMenu">
        </el-input>
      </div>
      <div class="menu">
        <i class="el-icon-more"></i>
        <i class="el-icon-information"></i>
      </div>
    </div>
    <div class="vbox flex1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchMenu:'',
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style>
.hbox{
  display:-moz-box;
  display:-webkit-box;
  display:flex;
  -webkit-box-orient:horizontal;
  -moz-box-orient:horizontal;
  box-orient:horizontal;
  -webkit-flex-flow:row;
  flex-flow:row;
}
.vbox{
  display:-moz-box;
  display:-webkit-box;
  display:flex;
  box-orient:vertical;
  -webkit-box-orient:vertical;
  -moz-box-orient:vertical;
  -webkit-flex-flow:column;
  flex-flow:column;
}
.flex1{
  -webkit-box-flex:1;
  -webkit-flex:1;
  -moz-flex:1;
  -moz-box-flex:1;
  flex:1;
  width:0;
}
html,body {
  font-family: Helvetica, sans-serif;
  margin:0;
  padding:0;
  height:100%;
}
#app{
  height:100%;
}
.top{
  height:47px;
  line-height:47px;
  border-bottom:1px solid #e5e5e5;
  padding:0 30px;
}
.top .center{
  margin:0 auto;
  width:200px;
}
.top .logo{
  color:#333;
  font-size:20px;
  font-weight:500;
  display:inline-block;
}
.menu{
  line-height:47px;
}
.menu > i{
  line-height:normal;
  font-size:20px;
  color:#00aaff;
  margin-left:20px;
}
</style>
