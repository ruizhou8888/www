<template>
<div class="vbox flex1">
    <div class="hbox info">
        <div class="logo">
            <el-upload
                class="avatar-uploader"
                action="hlbb/common/upload"
                name='file'
                :on-success="logoSuccess"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                <img v-if="info.logoPath" :src="info.logoPath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
        </div>
        <div class="flex1" style="padding-left:50px;">
            <el-form ref="companyForm" :model="info" label-width="90">
                <el-form-item label="企业名称">
                    <el-input placeholder="企业名称" v-model="info.name" disabled></el-input>
                </el-form-item>
            </el-form>
             <el-form-item label="活动时间">
                <el-col :span="6">
                   
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="6">
                    
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="6">
                    
                </el-col>
            </el-form-item>
        </div>
    </div>
    <div class="desc flex1">
        <div id="content"></div>
    </div>
</div>
</template>
<script>
    export default{
        data(){
            return {
                info:{
                    name:'',
                    logoPath:''
                }
            }
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
            logoSuccess(){

            }
        }
    }
</script>
<style lang="css" scoped>
    .info{
        width:70%;
    }
</style>