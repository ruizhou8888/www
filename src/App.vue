<template>
  <div id="app" class="vbox">
    <div class="top">
      <div class="logo">海里巴巴</div>
    </div>
    <div class="bottom hbox flex1" style="width:100%;overflow-y:auto;overflow-x:hidden">
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
html,body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin:0;
  padding:0;
  height:100%;
  overflow:hidden;
}
#app{
  height:100%;
}
#app .bottom{
  overflow-y:auto;
}
.container{
  width:100%;
}
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
}
[v-cloak]{
  display:none;
}
.top{
  height:47px;
  line-height:47px;
  border-bottom:1px solid #333;
  padding:0 30px;
  background-color:#2A3F54;
}
.top .center{
  margin:0 auto;
  width:200px;
}
.top .logo{
  color:#fff;
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
@font-face {font-family: "iconfont";
  src: url('./assets/fonts/iconfont.ttf?t=1491913106056') format('truetype') /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-shezhi:before {
    content: "\e61a";
}

.icon-pic:before {
    content: "\e608";
}

.icon-done:before {
    content: "\e614";
}

.icon-role:before {
    content: "\e60a";
}

.icon-user:before {
    content: "\e6ec";
}

.icon-company:before {
    content: "\e60b";
}

.icon-zhaopin:before {
    content: "\e688";
}

.icon-notice:before {
    content: "\e615";
}

.icon-desktop:before {
    content: "\e670";
}

.icon-job:before {
    content: "\e693";
}

.icon-resume:before {
    content: "\e686";
}
.icon-message:before { content: "\e73b"; }
.icon-tuwen:before { content: "\e646"; }
.icon-users:before { content: "\e603"; }
.tip{
  color:#999;line-height:normal;
  padding-left:130px;
  font-size:14px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 200px;
  display: block;
}
.tool-bar{
  background-color:#fff;
  padding:8px;
}
.tool-bar div > span{
  margin:0 10px;
}
.tool-bar .search{
  float:right;
  padding-right:10px;
}
.tool-bar .option{
  float:left;
}
</style>
