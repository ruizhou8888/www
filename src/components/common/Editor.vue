<template lang="html">
    <div id="editor" v-html="inputContent" @input="outputContent"></div>
</template>

<script>
import WangEditor from 'wangeditor'
export default {
    props: ['inputContent', 'uploadUrl'],
    data() {
        return {
            content: ''
        }
    },
    computed: {
    },
    mounted() {
        this.createEditor()
    },
    methods: {
        createEditor() {
            const self = this
            self.editor = new WangEditor('editor')
            self.editor.config.menus = ['source',
                '|', 
                'bold',
                'quote',
                'fontfamily',
                'fontsize',
                '|',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                'alignleft',
                'aligncenter',
                'alignright',
                'img',
                'video',
                'emotion'
            ]
            self.editor.config.uploadImgUrl = !this.uploadUrl?'hlbb/common/uploadByWangEditor':this.uploadUrl
            self.editor.config.uploadImgFileName = "file"
            self.editor.config.hideLinkImg = true;
            self.editor.onchange = function() {
                self.formatContent(this.$txt.html())
            }
            self.editor.create()
        },
        formatContent(content) {
            this.content = content
            this.outputContent()
        },
        outputContent() {
            this.$emit('input', this.content)
        },
        clear(){
            this.editor.$txt.html('<p><br></p>');
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>
    #editor{
        height: 550px;
    }
    .wangEditor-container{
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #CCC;
    }
</style>