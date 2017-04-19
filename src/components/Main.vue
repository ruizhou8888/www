<template>
<div class="hbox flex1">
    <left></left>
    <div class="vbox flex1" style="padding:20px;background-color:#EAEFF2;padding-left:240px;">
        <router-view></router-view>
    </div>
</div>

</template>
<script>
import Left from './common/Left.vue'

export default{
    components:{
        Left
    },
    mounted(){
        // this.$router.push({name:'Home'});
    },
    data(){
        return {
            title:''
        }
    }
}
</script>
<style>
    
</style>