<template>
    <section>
        <Card shadow style="margin-bottom:10px">
            <Form ref="form_ref" :model="form" :rules="rule" :label-width="80" label-position="right" label-colon>
                <Row :gutter="20">
                    <Col>
                        <FormItem label="标题" prop="title">
                            <Input v-model="form.title" placeholder="请输入标题"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="笔记种类">
                            <Cascader :data="noteTypeList" change-on-select placeholder="请选择笔记种类" v-model="form.type"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                 <Row :gutter="20">
                    <Col>
                        <FormItem label="标签">
                            <Input v-model="form.tag" @on-keyup="addTag" placeholder="请输入标签，Enter增加标签"></Input>
                            <Tag color="default" v-for="(item,index) in form.tags" :key="item+index" :name="item" closable @on-close="removeTag">{{item}}</Tag>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col class="text-right">
                        <FormItem>
                            <Button type="primary" icon="md-add" @click="save">保存</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <mavon-editor v-model="form.content" ref="md" @change="change" :toolbars="toolbars" :externalLink="externalLink" style="height: calc(100vh - 90px);"/>
        <Card shadow style="margin-top:10px">
            <div class="text-right"><Button type="primary" icon="md-add" @click="save">保存</Button></div>
        </Card>
    </section>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
    name: 'note_add',
    components: {
        html2canvas,
    },
    data() {
        return {
            screenImageData: '',
            form:{
                title: '',
                tags: [],
                type: [],
                tag: '',
                content:'', // 输入的markdown
                html:'',    // 及时转的html
            },
            rule: {
                title:[{ required: true, message: '标题不能为空!', trigger: 'blur' }]
            },
            noteTypeList:[],
            toolbars:{
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: false, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: false, // 单双栏模式
                preview: false, // 预览
            },
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
        this.queryNoteType()
        this.$nextTick(() => {
            window.scrollTo(0,0)
        });
    },
    methods: {
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.form.html = render;
        },
        queryNoteType(){
            this.$http.get('/note/notepad/type/list').then(resp => {
                // 格式转换成嵌套型
                for(const key in resp.data.data){
                    let item = resp.data.data[key]
                    if(item.parentId === null || item.parentId === ''){
                        let {...cloneItem} = item
                        cloneItem['childrens'] = []
                        this.getChildItem(cloneItem,resp.data.data)
                        this.noteTypeList.push(this.setChildItem(cloneItem))
                    }
                }
            })
        },
        getChildItem(child,data){
            for(const key in data){
                let item = data[key]
                if(item.parentId === child.id){
                    item['childrens'] = []
                    child.childrens.push(this.setChildItem(item))
                    this.getChildItem(item,data)
                }
            }
        },
        setChildItem(item){
            return {label: item.typeName, children: item.childrens, disabled:item.status === '0', value: item.id}
        },
        addTag(event){
            const tagName = this.form.tag;
            if(tagName.trim() !== '' && event.key === 'Enter'){
                if(this.form.tags.indexOf(tagName) < 0){
                    this.form.tags.push(tagName);
                }
                this.form.tag = ''
            }
        },
        removeTag(event, name){
            const index = this.form.tags.indexOf(name);
            this.form.tags.splice(index, 1);
        },
        save(){
            this.$refs['form_ref'].validate((valid) => {
                if (!valid) {
                    return false
                }

                if(!this.form.type){
                    this.$Message.error('请选择笔记种类!')
                    return;
                }

                if(!this.form.content){
                    this.$Message.error('请输入笔记内容!')
                    return;
                }
                
                // 上传截图
                // html2canvas只能将当前可视化部分截图，设置滚动条恢复初始位置
                window.scrollTo(0,0)
                // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
                html2canvas(document.getElementsByClassName("v-note-show")[0], {
                    backgroundColor: null,
                    useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                    // width: window.screen.availWidth,
                    // height: window.screen.availHeight,
                    // windowWidth: document.body.scrollWidth,
                    // windowHeight: document.body.scrollHeight,
                    // x: 0,
                    // y: window.pageYOffset
                }).then((canvas) => {
                    let url = canvas.toDataURL('image/png');
                    this.screenImageData = url;
                    this.$http.post('/file/image/upload/base64', {
                        files: [url]
                    }).then(resp => {
                        const reqData = {
                            noteType: this.form.type[this.form.type.length -1],
                            title: this.form.title,
                            tags: this.form.tags.toString(),
                            data: this.form.content,
                            screenImageId: resp.data.data[0]
                        }

                        this.$http.post('/note/notepad/data/add', reqData).then(resp => {
                            this.$Message.success('保存成功!')
                            this.$router.push({ name: 'note_data', params: {operType: 'removeTag'} })
                        })
                    })
                })
            })
        },
    }
}
</script>

<style>
    .oper_div{
        margin-bottom: 10px;
        text-align: right;
    }

    .oper_btn{
        margin-left: 10px;
    }

    .ivu-select-dropdown{
        z-index: 999999
    }
</style>
