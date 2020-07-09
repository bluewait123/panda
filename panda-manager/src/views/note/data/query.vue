<template>
    <section>
        <div style="text-align: center; width:100%; display: table;">
            
        </div>
        <Card style="margin-top:10px">
            <Form ref="query" :model="query" :label-width="80" label-position="right" label-colon>
                <Row :gutter="20">
                    <Col>
                        <FormItem label="">
                            <Input v-model="query.keyword" search enter-button="搜索" placeholder="请输入标题/标签/内容关键字" size="large" style="width: 90%;" @on-search="queryNoteData(1)" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="分类">
                            <div v-for="(item,index) in noteTypeList">
                                <Tag :style="{'cursor': 'pointer'}" v-for="(item,index) in item" :name="item.id" :key="item.id" size="medium" color="primary" checkable :checked="false" @on-change="selectNoteType">
                                    {{item.typeName}}
                                </Tag>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <FormItem label="创建日期">
                            <DatePicker @on-change="dateChange" type="daterange" placeholder="请选择日期范围" style="width: 50%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card v-if="dataList.length > 0" style="margin-top:10px">
            <div class="data_box">
                <ul class="dbox_ul">
                    <li v-for="(item,index) in dataList" class="dbox_li">
                        <div class=dbox_body>
                            <div class="dbox_body_title dbox_body_item">{{item.title}}</div>
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
                                    <span>{{item.noteType}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dbox_img">
                            <img src="https://dev-file.iviewui.com/tHlcBUZOSQXSTksmvhC8LXYiRDtgbbGF/small" style="width: 280px;">
                        </div>
                    </li>
                    <!-- <li class="dbox_li">
                        <div class=dbox_body>
                            <div class="dbox_body_title dbox_body_item">写给 iView 开发者的一封信</div>
                            <div class="dbox_body_tag dbox_body_item">
                                <Tag color="default" >程序资料</Tag>
                                <Tag color="default" >JAVA</Tag>
                                <Tag color="default" >SpringBoot 2.0</Tag>
                            </div>
                            <div class="dbox_body_text dbox_body_item">你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。iView 从立项到现在已经经历了两年的时间，7 月 28 日是它两周岁的生日，在这一天，我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，这篇文章将是一个很好的导引，下面就带你玩转 iView Developer</div>
                            <div class="dbox_body_time dbox_body_item">
                                发表于 <span style="color:rgb(142, 138, 138)">2018-07-17 23:27:00</span>
                            </div>
                            <div class="dbox_body_comment">
                                <div>
                                    <Icon type="ios-star-outline" />
                                    <span>1100</span>
                                </div>
                                <div><Icon type="ios-thumbs-up-outline" />1100</div>
                                <div><Icon type="ios-chatbubbles-outline" />1100</div>
                            </div>
                        </div>
                        <div class="dbox_img">
                            <img src="https://dev-file.iviewui.com/tHlcBUZOSQXSTksmvhC8LXYiRDtgbbGF/small" style="width: 280px;">
                        </div>
                    </li> -->
                </ul>
            </div>
            <div v-if="loadMore" class="text-center">
                <Button @click="">加载更多</Button>
            </div>
        </Card>
    </section>
    
</template>

<script>
export default {
    name: 'note_data_query',
    data() {
        return {
            query: {
                keyword: '',
                date: []
            },
            noteTypeList:[],
            selectNoteTyleList: [],
            dataList:[],
            loadMore: false
        }
    },
    created () {
        this.queryNoteType()
    },
    methods: {
        queryNoteType(){
            this.$http.post('/note/type/list').then(resp => {
                // 格式转换成嵌套型
                let temp = {}
                for(const key in resp.data.data){
                    let item = resp.data.data[key]
                    let target = temp[item.level] || []
                    target.push(item)
                    temp[item.level] = target
                }

                for(const k in temp){
                    this.noteTypeList.push(temp[k])
                }
            })
        },
        queryNoteData(page){
            const reqData = {
                keyword: this.query.keyword,
                beginDate: this.query.date[0] || '',
                endDate: this.query.date[1] || '',
                noteType: this.selectNoteTyleList
            }

            if(!reqData.keyword && !reqData.beginDate && reqData.noteType.length === 0){
                this.$Message.error('请输入搜索内容/分类/创建日期范围!')
                return;
            }
            
            this.$http.post('/note/data/query',reqData).then(resp => {
                if(resp.data.data){
                    for(const key in resp.data.data){
                        let item = resp.data.data[key]
                        if(item && item.tags){
                            let str = new String(item.tags)
                            item['tagList'] = str.split(',')
                        }
                        this.dataList.push(item)
                    }
                }
            })
        },
        selectNoteType(checked, name){
            const index = this.selectNoteTyleList.indexOf(name)
            if(index === -1){
                this.selectNoteTyleList.push(name)
            }else{
                this.selectNoteTyleList.splice(index, 1)
            }
        },
        dateChange(e){
            this.query.date = e
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
        cursor: pointer;
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
    
</style>
