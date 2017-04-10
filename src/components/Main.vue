<template>
<div class="hbox">
    <left></left>
    <router-view></router-view>
</div>
</template>
<script>
import Left from './common/Left.vue'
export default{
    components:{
        Left
    },
    data(){
        return {

        }
    }
}
</script>
<style >
    
</style>