<template>
<div class="left black">
    <div class="menu-con">
        <div class="login-user">
            <div class="logo">
                <img src="../../assets/images/default.png" alt="">
            </div>
            <div class="title"></div>
        </div>
        <div v-for="m in menus" class="menu" :class="{'active':m.route==curmenu}" @click="switchMenu(m)">
            <span><i class="iconfont" :class="m.icon"></i></span>
            <span class="menu-title" v-text="m.name"></span>
            <span class="line"></span>
        </div>
    </div>
</div>  
</template>
<script>
export default{
    data(){
        return {
            curmenu:this.$router.currentRoute.name,
            menus:[
                {id:1,name:'我的工作台',icon:'icon-desktop',route:'Home'},
                {id:2,name:'企业信息',icon:'icon-company',route:'Company'},
                {id:3,name:'宣传墙管理',icon:'icon-pic',route:'Wall'},
                {id:4,name:'通知公告',icon:'icon-notice',route:'Notice'},
                {id:5,name:'简历管理',icon:'icon-resume',route:'Resume'},
                {id:6,name:'职位招聘',icon:'icon-zhaopin',route:'Job'},
                {id:7,name:'待办事项',icon:'icon-done',route:'Todo'},
                {id:8,name:'用户管理',icon:'icon-user',route:'User'},
                {id:9,name:'常量管理',icon:'icon-role',route:'Constant'},
                {id:10,name:'角色管理',icon:'icon-shezhi',route:'Role'}
            ]
        }
    },
    methods:{
        switchMenu(m){
            this.curmenu = m.route;
            this.$router.push({name:m.route});
        }
    }
}    
</script>
<style scoped>
    .left{
        width:220px;
        background-color:#fff;
        position:fixed;
        left:0;
        height:100%;
        padding-left:2px;
        border-right:1px solid #DDDDDD;
        z-index:99
    }
    .menu-con{
        padding:20px 0;
    }
    .menu.active .line{
        border-right: 17px solid #EAEFF2;
        border-top: 17px solid transparent;
        border-bottom: 17px solid transparent;
        content: "";
        display: inline-block;
        position: absolute;
        right: -1px;
        top: 8px;
    }
    .login-user{
        padding:15px;
    }
    .login-user .logo{
        width:70px;
        height:70px;
        color:#fff;
        margin:0 auto;
    }
    .login-user .logo > img{
        width:100%;
        height:100%;
        border-radius:50%;
    }
    .login-user .title{
        font-size:14px;
        padding:10px 0;
        text-align: center;
    }


    .menu{
        padding:5px 0 5px 40px;
        margin:10px 0;
        cursor:pointer;
        font-size:16px;
        position: relative;
    }
    .menu i{
        font-size:22px;
    }
    /**主题样式*/
    .gray.left{
        background-color:#fff;
    }
    .gray .menu{
        color:#94908C;
    }
    .gray .menu:hover{
        color:#666;
    }
    .gray .menu .menu-title{
        padding-left:15px;
    }
    .gray .menu.active{
        color:#EB5E28;
    }
    .gray .menu.active i{
        color:#EB5E28
    }
    .gray .login-user .title{
        color:#333;
    }

    .blue .menu{
        color:#94908C;
    }
    .blue .menu:hover{
        color:#666;
    }
    .blue .menu .menu-title{
        padding-left:15px;
    }
    .blue .menu.active{
        color:#EB5E28;
    }
    .blue .menu.active i{
        color:#EB5E28
    }
    .blue .login-user .title{
        color:#333;
    }

    /**黑色主题*/
    .black.left{
        background-color:#2A3F54;
    }
    .black .menu{
        background-color:#2A3F54;
        color:#fff;
    }
    .black .menu:hover{
        color:#bbb;
    }
    .black .menu .menu-title{
        padding-left:15px;
    }
    .black .menu.active{
        color:#fff;
    }
    .black .menu.active i{
        color:#EB5E28
    }
    .black .login-user{
        border-bottom:1px solid #333;
    }
    .black .login-user .title{
        color:#fff;
    }
</style>