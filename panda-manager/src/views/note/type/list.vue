<template>
    <section>
        <Card shadow>
            
        </Card>
    </section>
</template>

<script>
export default {
    name: 'note_type',
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
