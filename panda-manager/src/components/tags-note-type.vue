<template>
    <!-- <template v-for="(item,index) in list">
        <Tag :name="item.id" :key="item.id" type="dot">
            {{item.name}}
        </Tag>
        <template v-if="item.children">
            <tags-note-type :list="item.children"></tags-note-type>
        </template>
    </template> -->
    <div style="text-align: left;">
        <template v-if="list">
            <template v-for="(item,index) in list">
                <div :style="boxStyle">
                    <Tag :name="item.id" :key="item.id">
                        {{item.name}} {{level}}
                    </Tag>
                    <template v-if="item.children">
                        <tags-note-type :list="item.children" :level="level + 1"></tags-note-type>
                    </template>
                </div>
            </template>
        </template>
    </div>
    
</template>

<script>
export default {
    name: 'tagsNoteType',
    props:{
        list:{
            type: Array,
            default () {
                return []
            }
        },
        level:{
            type: Number,
            default () {
                return 0
            }
        }
    },
    data() {
        return {
            boxStyle: {
                // 'margin-left': (this.level*10) + 'px',
                'float': 'left'
            }
        }
    },
}
</script>

<style>

</style>
