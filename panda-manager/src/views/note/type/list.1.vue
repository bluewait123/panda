<template>
    <section>
        <Card shadow>
            <Form ref="queryRef" :model="query" :label-width="80" label-position="right" label-colon>
                <Row :gutter="20">
                    <Col span="8">
                        <FormItem label="种类名称">
                            <Input v-model="query.mobile" placeholder="请输入种类名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="状态">
                            <Select v-model="query.status" clearable>
                                <Option v-for="(v,k) in NOTE_TYPE_STATUS" :value="k" :key="k">{{ v }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col class="text-right">
                        <FormItem>
                            <Button @click="query()" type="primary" icon="md-search" class="query-bt">查询</Button>
                            <Button @click="add()" type="primary" icon="md-add">新建</Button>
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
    name: 'note_type_bak',
    data () {
        return {
            NOTE_TYPE_STATUS:this.$enums.NOTE_TYPE_STATUS,
            query:{},
            list: [],
            columns: [
                {title: '类型名称', key: 'typeName', align: 'center'},
                {title: '上级类型名称', key: 'parentTypeName', align: 'center'},
                {title: '状态', key: 'status', align: 'center'},
                {title: '创建时间', key: 'createTime', align: 'center'},
                {title: '操作', key: 'oper', width: 200, align: 'center'}
            ]
        }
    },
    methods: {
        pageChange(currPage) {
            
        },
        query(){

        },
        add(){
            this.$router.push({name: 'system_user_add'})
        },
        update(id) {
            const reqdata = {id: id}
            this.$http.post('/system/user/info', reqdata).then(res => {
                this.$router.push({
                    name: 'system_user_edit',
                    params: res.data.data
                })
            })
        }
    }
}
</script>

<style>

</style>
