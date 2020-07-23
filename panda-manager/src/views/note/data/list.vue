<template>
    <section>
        <Card shadow>
            <Form ref="queryRef" :model="query" :label-width="80" label-position="right" label-colon>
                <Row :gutter="20">
                    <Col span="8">
                        <FormItem label="笔记种类">
                            <cascaderMulti @on-change="selectNoteTypeChange" :data="noteTypeList" placeholder="请选择笔记种类"></cascaderMulti>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="笔记状态">
                            <Select v-model="query.status" clearable>
                                <Option v-for="(v,k) in NOTE_TYPE_STATUS" :value="k" :key="k">{{ v }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col class="text-right">
                        <FormItem>
                            <Button @click="queryNoteData(1)" type="primary" icon="md-search" class="query-bt">查询</Button>
                            <Button @click="advancedSearch" type="primary" icon="md-search" class="query-bt">高级查询</Button>
                            <Button @click="add" type="primary" icon="md-add">新建</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <Table border :columns="columns" :data="list" size="small"></Table>
            <div class="page">
                <Page :total="list.length" show-elevator show-total  @on-change="pageChange" />
            </div>
        </Card>
    </section>
</template>

<script>
export default {
    name: 'note_data',
    data () {
        return {
            NOTE_TYPE_STATUS:this.$enums.NOTE_TYPE_STATUS,
            noteTypeList:[],
            query:{
                type: '',
                status: ''
            },
            list: [],
            columns: [
                {title: '创建时间', key: 'createTime', width:100, align: 'center'},
                {title: '标题', key: 'title', align: 'center'},
                {title: '种类', key: 'typeName', align: 'center'},
                {title: '标签', key: 'tags', align: 'center',
                    render: (h, params) => {
                        let vm = this
                        const tags = params.row.tags
                        if(tags){
                            let array = tags.split(",")
                            let result = []
                            for(const key in array){
                                result.push(h('Tag', {
                                    props:{
                                        color: 'default'
                                    }
                                },array[key]))
                            }
                            return result;
                        }
                        return h('span', {})
                    }
                },
                {title: '操作', key: 'oper', width: 250, align: 'center',
                    render: (h, params) => {
                        return [
                            h('Button', {
                                props:{
                                    type:'default',
                                    size: 'small',
                                },
                                on:{
                                    'click': function(){
                                        
                                    }
                                },
                                style:{
                                    marginRight:'10px',
                                    fontSize:'12px'
                                }
                            },'预览'),
                            h('Button', {
                                props:{
                                    type:'success',
                                    size: 'small',
                                },
                                on:{
                                    'click': function(){
                                        
                                    }
                                },
                                style:{
                                    marginRight:'10px',
                                    fontSize:'12px'
                                }
                            },'分享'),
                            h('Button', {
                                props:{
                                    type:'primary',
                                    size: 'small',
                                },
                                on:{
                                    'click': function(){
                                        
                                    }
                                },
                                style:{
                                    marginRight:'10px',
                                    fontSize:'12px'
                                }
                            },'编辑'),
                            h('Button', {
                                props:{
                                    type:'error',
                                    size: 'small',
                                },
                                on:{
                                    'click': function(){
                                        
                                    }
                                },
                                style:{
                                    marginRight:'10px',
                                    fontSize:'12px'
                                }
                            },'删除')
                        ]
                    }
                }
            ]
        }
    },
    created () {
        this.queryNoteType()
        this.queryNoteData(1)
    },
    methods: {
        queryNoteData(currPage){
            this.$http.post('/note/notepad/data/simpleQuery', {
                pageNum: currPage,
                type: this.query.type,
                status: this.query.status
            }).then(res => {
                this.list = res.data.data
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
            return {label: item.typeName , multiple: false, children: item.childrens,  typeStatus:item.status, value: item.id}
        },
        selectNoteTypeChange(data){
            this.query.type = data[data.length-1] || ''
        },
        pageChange(currPage) {
            queryNoteData(currPage)
        },
        add(){
            this.$router.push({name: 'note_data_add'})
        },
        update(id) {
            
        },
        advancedSearch(){
            this.$router.push({name: 'note_data_query'})
        }
    }
}
</script>

<style>
    
</style>
