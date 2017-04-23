<template>
<div class="hbox flex1" style="padding:20px 0 0 20px;overflow:auto;background:#fff;">
        <div class="vbox wall" style="width:730px;">
            <el-form ref="form" :model="wall" :rules="rules" label-width="90px">
                <div v-if="wall.stateNote" v-text="'审核状态：'+wall.stateNote" style="color:red;padding:0 0 15px 20px;"></div>
                <el-form-item label="展示标题" prop="title">
                    <el-input v-model="wall.title" placeholder="请输入展示标题"></el-input>
                </el-form-item>
                <el-form-item label="上传题图" prop="filePath">
                    <el-upload
                        ref="upload"
                        name="file"
                        class="avatar-uploader"
                        action="hlbb/common/upload"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="wall.filePath" :src="wall.filePath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="一句话描述" >
                    <el-input v-model="wall.subtitle"  placeholder="可选"></el-input>
                </el-form-item>
                <el-form-item label="内容详情" prop="remark">
                    <v-editor 
                        ref="editor"
                        :input-content="describe"
                        v-model="wall.remark"
                    ></v-editor>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!isReview" :disabled="wall.state == 1 || wall.state == 2" type="primary" @click="saveWall">保存信息</el-button>
                    <el-button v-if="!isReview" :disabled="!wall.id || wall.state == 1 || wall.state == 2" @click="submitReview">提交供审核</el-button>
                    <el-button v-if="isReview" type="primary" @click="changeWallStatus(2)">审核通过</el-button>
                    <el-button v-if="isReview" @click="changeWallStatus(3)">审核不通过</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-left:20px;">
            <div class="phone-con">
                <div class="card-con">
                    <p class="s-remark">所见所得（App列表页面预览）</p>
                    <div class="card">
                        <div class="title" v-text="wall.title"></div>
                        <div class="time" v-text="wall.createdTime"></div>
                        <div class="img" v-if="wall.filePath">
                            <img :src="wall.filePath" alt="">
                        </div>
                        <div class="subtitle" v-text="wall.subtitle"></div>
                        <div class="readline">
                            阅读全文<i class="el-icon-arrow-right zhishi"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-left:10px;">
            <div class="phone-con">
                <div class="card-con detail">
                    <div class="title" v-text="wall.title"></div>
                    <div class="info">
                        <el-tag type="primary">原创</el-tag>
                        <span v-text="wall.createdTime"></span>
                    </div>
                    <div class="img" v-if="wall.filePath">
                        <img :src="wall.filePath" alt="">
                    </div>
                    <div v-html="wall.remark" class="descs"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editor from '../common/Editor.vue'
export default{
    components:{
        'v-editor':editor
    },
    mounted(){
        this.defaultWall = JSON.parse(JSON.stringify(this.$data.wall));
        if(this.$route.params.isReview){
            this.isReview = this.$route.params.isReview;
        }
        this.getWallById();    
    },
    data(){
        var me =this;
        return {
            isReview:false,
            wall:{
                id:'',
                title:'',
                subtitle:'',
                remark:'',
                createdTime:me.$date.format(new Date()),
                updateTime:me.$date.format(new Date()),
                filePath:'',
                stateNote:'',
                state:0,
                companyId:me.$cookie.get('company-id'),
                createdUid:me.$cookie.get('mng-id'),
                updateUid:me.$cookie.get('mng-id')
            },
            describe:'',
            rules:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                filePath: [
                    { required: true, message: '请上传题图', trigger: 'change' }
                ],
                remark:[
                    { required: true, message: '请输入文章内容', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        beforeAvatarUpload:function(file) {
            if(this.wall.state==1 || this.wall.state==2){
                this.$message({
                    message:'未送审的才能修改',
                    type:'warning'
                });
                return false;
            }
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isJPG && isLt2M;
        },
        uploadSuccess:function(res){
            this.wall.filePath = res.data;
        },
        changeWallStatus(status){

        },
        submitReview(){
            var me=this;
            me.$confirm('确定提交审核吗？', '提示', {
                type: 'warning'
            }).then(() => {
                me.$http.post('wall/sendReview',me.wall,function(res){
                    me.$message({
                        message:'提交成功',
                        type:'success'
                    });
                    me.$router.push({name:'Wall'});
                });
            });
        },
        saveWall(){
            var me=this;
            me.$refs['form'].validate((valid) => {
                if(valid){
                    me.$http.post('wall/saveWall',me.wall,function(res){
                        me.$message({
                            message:'保存成功',
                            type:'success'
                        });
                        me.wall = red.data;
                    })
                }else{
                    return false;
                }
            })
        },
        getWallById(){
            var me = this;
            var wallId = this.$route.params.wallId;
            if(!wallId){
                return;
            }
            me.wall.id = this.$route.params.wallId;
            me.$http.get('wall/getWallById',{id:wallId},function(res) {
                me.describe = res.data.remark
                me.wall = res.data;
            });
        },
    }
}
</script>
<style lang="css" scoped>
  .wall #desc{
    height:400px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
    width: 340px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 340px;
    height: 150px;
    display: block;
  }
  .s-remark{
      padding:10px;
      font-size:14px;
  }
  .phone-con{
    background:url(../../assets/images/phone-case.png) no-repeat;
    position:relative;
    height:800px;
    width:375px;
  }
  .card-con{
    position:absolute;
    top:90px;
    left:5px;
    width:335px;
    padding:0 10px;
    height:590px;
    background:#eeeef4;
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
  .detail{
      background:#fff;
      padding-top:20px;
      height:570px;
      overflow:auto;
  }
  .detail div{
      padding-bottom:12px;
  }
  .detail .title{
      padding-top:6px;
      text-align:center;
      font-size:20px;
  }
  .detail .info{
      font-size:14px;color:#999;
  }
  .detail .info span{
      margin:0 5px;
  }
  .detail .img{
      width:100%;
  }
  .detail .img img{
      width:100%;
  }
  .detail .descs{
      color:#999 !important;
      font-size:13px;
  }
</style>