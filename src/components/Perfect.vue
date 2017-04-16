<template>
<div style="padding-top:100px;width:998px;margin:0 auto">
    <p style="color:#535353;font-size:18px;font-weight:bold;">海里巴巴注册</p>
    <div style="border:1px solid #eee;border-top:none">
        <div style="text-align:center;border-bottom:1px solid #eee;padding:15px 0">
            <el-steps :space="100" :active="active" finish-status="success">
                <el-step title="注册账号"></el-step>
                <el-step title="填写信息"></el-step>
                <el-step :title="titles[active]"></el-step>
                <el-step :title="results[active]"></el-step>
            </el-steps>
        </div>
        <div style="padding:30px;color:#353535;box-shadow: 0 1px 2px rgba(150,150,150,0.3);">
            <div v-if="active==3" style="text-align:center">您已提交审核，工作人员会尽快进行相关审核工作，请耐心等待！</div>
            <div v-if="active==4" style="text-align:center;color:red;font-size:18px;" v-text="'审核不通过原因：'+mng.statusNote"></div>
            <div v-if="active==1 || active==2 || active == 4">
                <p style="font-size:18px;">用户信息登记</p><br>
                海里巴巴平台致力于打造真实、合法、有效的互联网平台。为了更好的保障你和广大用户的合法权益，请你认真填写以下登记信息。 
                <p style="font-size:18px;">主体信息登记</p><br>
                <el-form ref="ruleForm" :model="mng" :rules="rules" label-width="130px" style="width:600px;">
                    <el-form-item label="企业名称" prop="name">
                        <el-input v-model="mng.name" ></el-input>
                    </el-form-item> 
                    <p class="tip">需与当地政府颁发的商业许可证书或企业注册证上的企业名称完全一致，信息审核审核成功后，企业名称不可修改。</p>
                    <el-form-item label="营业执照注册号" prop="businessNo">
                        <el-input v-model="mng.businessNo"></el-input>
                    </el-form-item> 
                    <p class="tip">请输入15位营业执照注册号或18位的统一社会信用代码</p>
                    <el-form-item label="上传营业执照"  prop="businessLicencePath">
                        <el-upload
                            class="avatar-uploader"
                            action="hlbb/common/upload"
                            name='businessLicencePath'
                            :show-file-list="false"
                            :data="uploadParam"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="mng.businessLicencePath" :src="mng.businessLicencePath" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传外派证" prop="assignmentPath">
                        <el-upload
                            class="avatar-uploader"
                            action="hlbb/common/upload"
                            name='assignmentPath'
                            :show-file-list="false"
                            :data="uploadAssignmentParam"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="mng.assignmentPath" :src="mng.assignmentPath" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="甲级服务机构证" prop="firstDivisionPath">
                        <el-upload
                            class="avatar-uploader"
                            action="hlbb/common/upload"
                            name='firstDivisionPath'
                            :show-file-list="false"
                            :data="uploadFirstDivisionParam"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="mng.firstDivisionPath" :src="mng.firstDivisionPath" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                    <p style="font-size:18px;">企业联系人信息</p><br>
                    <el-form-item label="联系人姓名" prop="contactName">
                        <el-input v-model="mng.contactName" ></el-input>
                    </el-form-item> 
                    <p class="tip">请填写该企业联系人的姓名。</p>
                    <el-form-item label="联系人电话" prop="contactPhone">
                        <el-input v-model="mng.contactPhone"></el-input>
                    </el-form-item> 
                    <p class="tip">请填写该企业联系人的手机号码</p>
                    <el-form-item>
                        <el-button @click="submitForm('ruleForm')">保存信息</el-button>
                        <el-button @click="submitReview('ruleForm')" style="margin-left:80px;" type="success">提交审核</el-button>
                    </el-form-item>
                </el-form> 
            </div>
        </div>

    </div>
</div>
</template>
<script>

export default{
    data (){
        var me =this;
        return {
            active:1,
            email:'',
            titles:{
                1:'提交审核',
                2:'提交审核',
                3:'审核中',
                4:'已审核'
            },
            results:{
                1:'等待结果',
                2:'等待结果',
                3:'等待结果',
                4:'审核不通过'
            },
            loaded:false,
            isChange:false,
            mng:{
                id:'',
                statusNote:'',
                name:'',
                businessNo:'',
                businessLicencePath:'',//营业执照路径
                assignmentPath:'',
                firstDivisionPath:'',
                contactName:'',
                contactPhone:'',
                mngId:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                businessNo: [
                    { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
                ],
                businessLicencePath:[
                    { required: true, message: '请上传营业执照', trigger: 'blur' }
                ],
                assignmentPath:[
                    { required: true, message: '请上传外派证', trigger: 'blur' }
                ],
                firstDivisionPath:[
                    { required: true, message: '请上传甲级服务机构证', trigger: 'blur' }
                ],
                contactName: [
                    { required: true, message: '请输入企业联系人姓名', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, message: '请输入企业联系人手机号', trigger: 'blur' }
                ]
            },
            uploadParam: {
                type: 'business_licence',
                tableName: 'company',
                primaryValue:'',
                uid:''
            },
            uploadAssignmentParam: {
                type: 'assignment',
                tableName: 'company',
                primaryValue:'',
                uid:''
            },
            uploadFirstDivisionParam: {
                type: 'first_division',
                tableName: 'company',
                primaryValue:'',
                uid:''
            }
        }
    },
    mounted (){
        
    },
    methods:{
        beforeAvatarUpload:function(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm:function(formName) {
            var me=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    me.$http.post('company/registerCompany',me.mng).then(function(res) {
                        
                    })
                } else {
                    return false;
                }
            });
        },
        submitReview:function(){
            var me=this;
            
        },
        loadCompanyInfo:function(){
            var me=this;
            me.$http.get('company/perfect',).then(function(res) {
                me.mng = res.data;
                me.loaded = true;
            })
        },
    }
}
</script>
<style>

</style>