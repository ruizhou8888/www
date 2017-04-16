<template>
<div class="bk flex1">
    <div class="login-con">
        <div class="hint-info">
            <div class="ads1">
                <div class="title">抢人、永远快人一步</div>
                <div class="sub-title">专注于船员求职，直接通过平台与求职者面试</div>
            </div>
            <div class="ads2">
                <div class="title">海量优质人才、供您选择</div>
                <div class="sub-title">在线面试，沟通便捷，提高效率</div>
            </div>
        </div>
        <div class="login">
            <div class="top-tab hbox">
                <div class="flex1 nowidth" :class="{'active':curTab==1}" @click="switchTab(1)"><span>企业登录</span></div>
                <div class="flex1 nowidth" :class="{'active':curTab==2}" @click="switchTab(2)"><span>企业注册</span></div>
            </div>
            <div class="login-form" v-show="curTab==1">
                <el-form ref="loginForm" :rules="loginRules" :model="user" label-width="85px">
                    <el-form-item label="用户名" prop="loginName">
                        <el-input
                            size="large"
                            placeholder="邮箱账号"
                            v-model="user.userName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            size="large"
                            placeholder="密码"
                            v-model="user.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="login" style="width:100%;" type="primary" size="large">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="login-form" v-show="curTab==2">
                <el-form ref="regForm" :rules="regrules" :model="regUser" label-width="85px">
                    <el-form-item label="用户名" prop="loginName">
                        <el-input
                            size="large"
                            placeholder="设置登录邮箱账号"
                            v-model="regUser.loginName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="checkCode">
                        <el-input
                            size="large"
                            name="checkCode"
                            placeholder="验证码"
                            v-model="regUser.checkCode">
                            <template slot="append">
                                <span @click="getEmailCode">获取验证码</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input 
                            type="password" size="large" placeholder="设置密码" 
                            v-model="regUser.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surepwd">
                        <el-input 
                            type="password" size="large" placeholder="请确认密码" v-model="regUser.surepwd">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="register" style="width:100%;" type="primary" size="large">注册</el-button>
                    </el-form-item>
                    <div style="text-align:center;padding:20px 0">
                        <a @click="curTab=1" class="link">已有账户？直接登录</a>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
    <div class="desc">
        <span>—</span><span style="padding:0 15px;color:#999">专注于船员招聘，只做最好</span><span>—</span>
    </div>
</div>
</template>
<script>
    export default {
        data() {

            var validateEmail = (rule, value, callback) => {
                var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  
                if(!reg.test(value.trim())){  
                    callback=(new Error("您输入的邮箱格式不对"));
                }else{
                    callback();
                }
            };

            return {
                curTab:1,
                user:{
                    loginName:'',
                    password:''
                },
                regUser:{
                    loginName:'',
                    password:'',
                    surepwd:'',
                    checkCode:''
                },
                loginRules:{
                    loginName: [
                        { required: true, message: '请填写用户名', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'change' }
                    ]
                },
                regrules:{
                    loginName: [
                        { required: true, message: '请填写用户名', trigger: 'change' },
                        { validator:validateEmail, message: '邮箱格式不正确', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'change' }
                    ],
                    surepwd: [
                        { required: true, message: '请再次确认密码', trigger: 'change' }
                    ],
                    checkCode: [
                        { required: true, message: '请输入验证码', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            switchTab: function(t) {
                this.curTab = t;
            },
            getEmailCode:function(){
                var me=this;
                if(!me.regUser.loginName.trim()){
                    return;
                }
                var reg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  
                if(!reg.test(me.regUser.loginName.trim())){  
                    me.$message({
                        message: "邮箱格式不正确",
                        type: 'error'
                    });
                    return;
                }
                me.$http.post('common/getEmailCode',{
                    email:me.regUser.loginName.trim()
                },function(res){
                    me.$message({
                        message: "验证码已发送",
                        type: 'success'
                    });
                });
            },
            login: function() {
                var me = this;
                me.$http.post('mng/mngLogin', me.user).then(function(res) {
                    me.$router.push({name:'Perfect'});
                })
            },
            register:function(){
                var me=this;
                me.$refs['regForm'].validate((valid) => {
                    if (valid) {
                        me.$http.post('mng/register',me.regUser,function(res){
                            console.log(res);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped> 
    .bk {
        height: 500px;
        background-color: #01A0E9;
    }
    
    .login-con {
        margin: 0 auto;
        width: 1280px;
        height: 100%;
        position: relative;
    }
    
    .hint-info {
        position: absolute;
        top: 50%;
        left: 100px;
        width: 434px;
        height: 258px;
        margin-top: -129px;
        color: #fff;
    }
    
    .hint-info .ads1 {
        background: url(../assets/login/ads1.png) no-repeat;
        background-position: 15px center;
        background-size: 65px;
        padding-left: 95px;
    }
    
    .hint-info .ads2 {
        background: url(../assets/login/ads2.png) no-repeat;
        background-position: 15px center;
        background-size: 65px;
        padding-left: 95px;
        margin-top: 60px;
    }
    
    .hint-info .title {
        font-size: 26px;
    }
    
    .hint-info .sub-title {
        padding-top: 10px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
    }
    
    .login-con .login {
        width: 350px;
        position: absolute;
        top: 60px;
        right: 50px;
        background: #fff;
        border: 1px solid #ebebeb;
        padding: 28px 48px;
    }
    
    .top-tab div {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #666667;
        cursor: pointer;
    }
    
    .top-tab div span {
        padding-bottom: 12px;
        width: 65%;
        display: inline-block;
    }
    
    .top-tab div.active span {
        color: #00beff;
        border-bottom: 3px solid #00beff;
    }
    
    .login-form {
        padding: 30px 0;
    }
    
    .login-input {
        background: #f8f8f8;
    }
    
    .codeinput {
        margin-top: 25px;
    }
    
    .link {
        color: #00AAFF;
        cursor: pointer;
    }
    
    .desc {
        text-align: center;
        color: #D9D1D1;
        font-size: 17px;
        height: 300px;
        line-height: 300px;
    }
    
    .error {
        color: red;
        font-size: 14px;
        padding: 15px 0 0 0;
    }
    .el-input-group__append {
        border-left: 0;
        cursor:pointer !important;
    }
</style>