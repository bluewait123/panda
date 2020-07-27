<template>
    <mavon-editor 
        v-model="content" 
        ref="md"
        style="height: calc(100vh - 90px);"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="true"
        :externalLink="externalLink"
        :ishljs = "true"/>
</template>

<script>
export default {
    name: 'note_data_preview',
    data() {
        return {
            id: this.$route.params.id,
            content:'',
            externalLink: {
                markdown_css: function() {
                    // 这是你的markdown css文件路径
                    return '/markdown/github-markdown.min.css';
                },
                hljs_js: function() {
                    // 这是你的hljs文件路径
                    return '/highlightjs/highlight.min.js';
                },
                hljs_css: function(css) {
                    // 这是你的代码高亮配色文件路径
                    return '/highlightjs/styles/' + css + '.min.css';
                },
                hljs_lang: function(lang) {
                    // 这是你的代码高亮语言解析路径
                    return '/highlightjs/languages/' + lang + '.min.js';
                },
                katex_css: function() {
                    // 这是你的katex配色方案路径路径
                    return '/katex/katex.min.css';
                },
                katex_js: function() {
                    // 这是你的katex.js路径
                    return '/katex/katex.min.js';
                },
            }
        }
    },
    created () {
        this.queryNoteData()
    },
    methods: {
        queryNoteData(){
            const reqData = {
                params: {
                    id: this.id
                }
            }
            this.$http.get('/note/notepad/data/detail',reqData).then(resp => {
                if(resp.data.data){
                    this.content = resp.data.data
                }
            })
        }
    }
}
</script>

<style>

</style>
