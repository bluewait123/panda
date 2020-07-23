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
        :ishljs = "true"/>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    name: 'note_data_preview',
    components: {
        mavonEditor
    },
    data() {
        return {
            id: this.$route.params.id,
            content:''
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
