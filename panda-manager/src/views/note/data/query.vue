<template>
    <div>
        <Card>
            <div style="padding:5px 50px 5px 50px;">
                <Input v-model="query.keyword" search enter-button="搜索" placeholder="请输入标题/标签/内容关键字" size="large"  @on-search="queryNoteData(1)" />
                <Tag style="margin-top:10px;font-weight: bold;" color="success">标签 </Tag>
                <Tag :style="{'cursor': 'pointer','margin-top':'10px'}" v-for="(item,index) in tagData" :name="item.name" :key="item.name" size="default" :color="item.color" @click.native="selectTagChange(item)">
                    {{item.name}}
                </Tag>
            </div>
        </Card>
        <section style="margin-top:10px">
            <Row>
                <Col span="4">
                     <Card shadow >
                        <Tree class="note_type_tree_box" :data="noteTypeData" :render="renderContent" @on-select-change="selectNoteType"></Tree>
                    </Card>
                </Col>
                <Col span="20">
                    <Card style="margin-left:10px">
                        <span v-if="dataList.length === 0">暂无数据</span>
                        <div class="folder_title" v-if="dataList.length > 0">
                            <div class="folder_title_icon"></div>
                            <div class="folder_title_text">{{folderTitle}}</div>
                            <div class="folder_share" v-show="shareFlag"><Button type="primary" size="small" icon="md-share">分享</Button></div>
                        </div>
                        <div class="data_box">
                            <ul class="dbox_ul">
                                <li v-for="(item,index) in dataList" class="dbox_li">
                                    <div class=dbox_body>
                                        <div class="dbox_body_title dbox_body_item">
                                            <span style="cursor: pointer;" @click="preview(item)">{{item.title}}</span>
                                        </div>
                                        <div class="dbox_body_tag dbox_body_item">
                                            <template v-if="item.tagList" v-for="tagItem in item.tagList">
                                                <Tag color="default" >{{tagItem}}</Tag>
                                            </template>
                                        </div>
                                        <div class="dbox_body_text dbox_body_item">{{item.data}}</div>
                                        <div class="dbox_body_time dbox_body_item">
                                            发表于 <span style="color:rgb(142, 138, 138)">{{item.createTime}}</span>
                                        </div>
                                        <div class="dbox_body_comment">
                                            <div>
                                                <Icon type="ios-folder-outline" />
                                                <span>{{item.noteTypePathsName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dbox_img">
                                        <!-- <img :src="item.screenImageUrl" style="width: 280px;"> -->
                                        <div @click="preview(item)" :style="{'background-image': 'url('+item.screenImageUrl+')', 'cursor': 'pointer'}"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="loadMore" class="text-center">
                            <Button @click="">加载更多</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </section>
    </div>
</template>

<script>
export default {
    name: 'note_data_query',
    data() {
        return {
            query: {
                keyword: '',
                date: [],
                noteType: {}
            },
            tagData:[],
            selectTagList: [],
            dataList:[],
            loadMore: false,
            noteTypeData:[
                {
                    title: '笔记类型列表',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', data.title)
                            ])
                        ])
                    },
                    children: []
                }
            ],
            folderTitle: '',
            shareFlag: false
        }
    },
    created () {
        this.queryNoteType()
        this.queryNoteTag()
    },
    methods: {
        queryNoteTag(){
            this.$http.get('/note/notepad/data/tags').then(resp => {
                if(resp.data.data){
                    resp.data.data.map(item => {
                        this.tagData.push({name: item, select: false, color: 'default'})
                    })
                }
            })
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
                        this.noteTypeData[0].children.push(this.setChildItem(cloneItem))
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
            return {title: item.typeName , expand: true, children: item.childrens,  typeStatus:item.status, id: item.id, isLoading: false}
        },
        queryNoteData(page){
            let tags = []
            this.tagData.map(item => {
                if(item.select){
                    tags.push(item.name)
                }
            })
            this.$http.post('/note/notepad/data/multipleQuery',{
                keyword: this.query.keyword,
                tags: tags
            }).then(resp => {
                let list = resp.data.data.list
                let types = resp.data.data.types
                if(list){
                    for(const key in list){
                        let item = list[key]
                        if(item && item.tags){
                            let str = new String(item.tags)
                            item['tagList'] = str.split(',')
                        }
                    }
                }

                // 笔记类型格式转换成嵌套型
                if(types){
                    this.noteTypeData[0].children = []
                    for(const key in types){
                        let item = types[key]
                        if(item.parentId === null || item.parentId === ''){
                            let {...cloneItem} = item
                            cloneItem['childrens'] = []
                            this.getChildItem(cloneItem,types)
                            this.noteTypeData[0].children.push(this.setChildItem(cloneItem))
                        }
                    }
                }
                this.shareFlag = false
                this.dataList = list || []
                this.folderTitle = '文章列表'
            })
        },
        selectNoteType(data,item){
            this.query.noteType = item
            this.queryNoteDataByType(1)
        },
        queryNoteDataByType(page){
            this.$http.post('/note/notepad/data/queryByNoteType',{
                noteType: this.query.noteType.id
            }).then(resp => {
                let list = resp.data.data
                if(list){
                    for(const key in list){
                        let item = list[key]
                        if(item && item.tags){
                            let str = new String(item.tags)
                            item['tagList'] = str.split(',')
                        }
                    }
                }

                this.shareFlag = true
                this.dataList = list || []
                this.folderTitle = this.query.noteType.title + '列表'
            })
        },
        selectTagChange(item){
            item.color = item.select ? 'default' : 'primary'
            item.select = !item.select
        },
        dateChange(e){
            this.query.date = e
        },
        preview(item){
            this.$router.push({
                name: 'note_data_preview',
                params: {
                    id: item.id
                }
            })
        },
        renderContent(h, { root, node, data }){
            let vm = this
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-folder-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span',data.title),
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                })
            ])
        }
    }
}
</script>

<style>
    .dbox_ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .dbox_li{
        align-items: normal;
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e8eaec;
        display: flex;
        margin: 0;
    }

    .dbox_li:last-child{
        border-bottom: 0px;
    }

    .dbox_body{
        width: calc(100% - 290px);
    }

    .dbox_img{
        width: 250px;
        margin-left: 10px;
    }

    .dbox_body_item{
        margin-bottom: 10px;
    }

    .dbox_body_title{
        color: #515a6e;
        transition: all .2s;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
    }

    .dbox_body_time{
        font-size: 12px;
    }

    .dbox_body_comment div{
        float: left;
        margin-right: 10px;
        font-size: 12px;
    }

    .dbox_body_comment div span{
        color: #635f5f;
        margin-left: 5px;
        
    }

    .dbox_img div{
        width: 280px;
        height:180px;
        background-size: 280px;
    }

    .note_type_tree_box{
        overflow-x:scroll;
    }

    .folder_title{
        display: flex;
    }

    .folder_title_icon{
        height: 30px;
        float: left;
        border-left: 3px solid #2395f1;
        display: flex;
    }

    .folder_title_text{
        margin-left: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    .folder_share{
        position:absolute;
        right: 0;
        margin-right: 10px;
    }
    
</style>
