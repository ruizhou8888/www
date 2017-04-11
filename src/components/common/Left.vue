<template>
<div class="left">
    <div class="menu-con">
        <div v-for="m in menus" class="menu" :class="{'active':m.id==curmenu}" @click="switchMenu(m)">
            <span><i class="iconfont" :class="m.icon"></i></span>
            <span class="menu-title" v-text="m.name"></span>
        </div>
    </div>
    <div class="loginout">退出登录</div>
</div>
</template>
<script>
export default{
    data(){
        return {
            curmenu:1,
            menus:[
                {id:1,name:'我的工作台',icon:'icon-desktop'},
                {id:2,name:'企业信息',icon:'icon-company'},
                {id:3,name:'宣传墙管理',icon:'icon-pic'},
                {id:4,name:'公告管理',icon:'icon-notice'},
                {id:5,name:'简历管理',icon:'icon-resume'},
                {id:6,name:'职位招聘',icon:'icon-zhaopin'},
                {id:7,name:'待办事项',icon:'icon-done'},
                {id:8,name:'用户管理',icon:'icon-user'},
                {id:9,name:'常量管理',icon:'icon-role'},
                {id:10,name:'角色管理',icon:'icon-shezhi'}
            ]
        }
    },
    methods:{
        switchMenu(m){
            this.curmenu = m.id;
        }
    }
}    
</script>
<style scoped>
    .left{
        width:240px;
        background-color:#1C2C37;
        position:relative;
    }
    .left .loginout{
        position:absolute;
        bottom:10px;
        left:20px;
        width:160px;
        height:44px;
        line-height:44px;
        color:#fff;
        text-align:center;
        cursor:pointer;
        background-color:#1E202C;
        border-radius:4px;
    }
    .menu-con{
        padding:20px 0;
    }
    .menu{
        color:#999CA1;
        padding:5px 0 5px 40px;
        cursor:pointer;
        font-size:14px;
    }
    .menu i{
        font-size:18px;
    }
    .menu:hover{
        color:#fff;
    }
    .menu .menu-title{
        padding-left:15px;
    }
    .active{
        background-color:#1E202C;
        color:#fff;
    }
    .menu.active i{
        color:#EA535A
    }
    .login-user{
        padding:15px;
        height:90px;
        line-height:90px;
        border-bottom:1px solid #1E202C;
    }
    .login-user div{
        float:left;
    }
    .login-user .logo{
        width:70px;
        height:70px;
        color:#fff;
    }
    .login-user .logo > img{
        width:100%;
        height:100%;
    }
    .login-user .title{
        color:#fff;
        font-size:18px;
        vertical-align:middle;
    }
</style>