<template>
    <section>
        <Card shadow>
            <Tree :data="list" :render="renderContent"  class="tree-render"></Tree>
        </Card>
        <Modal title="新增笔记种类" v-model="inputNameModal" class-name="vertical-center-modal">
            <Form ref="ifnoForm" :model="info" :rules="rule" :label-width="100" label-position="right" label-colon>
                <FormItem label="种类名称" prop="name">
                    <Input v-model="info.name" placeholder="请输入种类名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="inputNameModal=false">取消</Button>
                <Button type="primary" size="large" @click="addNoteType">确定</Button>
            </div>
        </Modal>
    </section>
</template>

<script>
export default {
    name: 'note_type',
    data () {
        return {
            inputNameModal: false,
            NOTE_TYPE_STATUS:this.$enums.NOTE_TYPE_STATUS,
            activationTarget: {},
            info:{
                name: ''
            },
            rule: {
                name:[
                    { required: true, message: '种类名称不能为空!', trigger: 'blur' }
                ]
            },
            query:{},
            list: [
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
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    float: 'right',
                                    marginRight: '32px'
                                }
                            }, [
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'ios-add',
                                        type: 'primary'
                                    }),
                                    style: {
                                        width: '64px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                })
                            ])
                        ]);
                    },
                    children: []
                }
            ],
        }
    },
    created () {
        this.queryList()
    },
    methods: {
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
                            type: data.children && data.children.length > 0 ? 'ios-folder-outline' : 'ios-paper-outline'
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
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add'
                        }),
                        style: {
                            marginRight: '15px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('i-switch',{
                        props: {
                            size: 'large',
                            value: data.typeStatus == '1',
                            loading: data.isLoading || false,
                            beforeChange: function(){
                                return new Promise((resolve) => {
                                    const reqData = {
                                        id: data.id,
                                        status: data.typeStatus == '1' ? '0' : '1'
                                    }
                                    data.isLoading = true
                                    vm.$http.post('/note/type/update', reqData).then(res => {
                                        vm.$Message.success('操作成功!')
                                        resolve()
                                    }).catch(err => {
                                        return err
                                    }).finally(() => {
                                        data.isLoading = false
                                    })
                                })
                            }
                        },
                        scopedSlots:{
                            open: () => h('span','启用'),
                            close: () => h('span','禁用'),
                        }
                    })
                ])
            ]);
        },
        queryList(){
            this.$http.get('/note/notepad/type/list').then(resp => {
                // 格式转换成嵌套型
                for(const key in resp.data.data){
                    let item = resp.data.data[key]
                    if(item.parentId === null || item.parentId === ''){
                        let {...cloneItem} = item
                        cloneItem['childrens'] = []
                        this.getChildItem(cloneItem,resp.data.data)
                        this.list[0].children.push(this.setChildItem(cloneItem))
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
        append (data) {
            this.activationTarget = data
            this.inputNameModal = true
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        addNoteType(){
            this.$refs['ifnoForm'].validate((valid) => {
                if (!valid) {
                    return false
                }
                const reqData = {
                    typeName: this.info.name,
                    parentId: this.activationTarget.id
                }

                this.$http.post('/note/notepad/type/add', reqData).then(resp => {
                    const respData = resp.data.data
                    const children = this.activationTarget.children || [];
                    children.push({
                        title: this.info.name,
                        expand: true,
                        children: [],
                        typeStatus: '1',
                        id: respData, 
                        isLoading: false
                    });
                    this.$set(this.activationTarget, 'children', children);
                    this.inputNameModal = false
                    this.info.name = ''
                })
            })
        },
        updateNoteType(data,reqData){
            this.$http.post('/note/type/update', reqData).then(resp => {
                if(data.typeName){
                    this.$set(this.activationTarget, 'title', data.typeName);
                }
            })
        }
    }
}
</script>

<style>
    .tree-render .ivu-tree-title{
        width: 100%;
    }
</style>
