<template>
    <div class="nav">
        <Button @click="moveLeft" size="small" class="btn move_btn" icon="ios-arrow-back"></Button>
        <div class="tags_box" ref="tagsBox">
            <div class="tags_box_body" ref="tagsBoxBody" :style="{left : left + 'px'}">
                <Tag v-for="(item,index) in tagList" :name="item.routerUrl" :key="index" class="tag" type="dot" :closable="Object.keys(tagList).length > 1" :color="item.color" @on-close="closeTag" @click.native="selected(item)">
                    {{item.name}}
                </Tag>
            </div>
        </div>
        <Button @click="moveRight" size="small" class="btn move_btn" icon="ios-arrow-forward"></Button>
        <Dropdown>
            <Button size="small" class="btn btn-close" icon="ios-close-circle-outline"></Button>
            <DropdownMenu slot="list">
                <DropdownItem>关闭所有</DropdownItem>
                <DropdownItem>关闭其他</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>

import Vue from 'vue'
import {mapMutations} from 'vuex'

const E404 = {id: "9999", parentId: "0", name: "404", icon: "ios-speedometer", routerUrl: "main_404"}

export default {
    name: 'TagsNav',
    data () {
        return {
            left : 0,
            tagList: {},
            tagSortArray: []
        }
    },
    props: {
        list: {
            type: Object,
            default () {
                return {}
            }
        },
        defaultTag: {
            type: String,
            default () {
                return ''
            }
        }
    },
    mounted () {
        
    },
    computed:{
        
    },
    activated () {
        
    },
    watch: {
        // 监听数据变化
        'defaultTag':{
            handler:function(val,oldval){
                this.addTag(val,oldval || this.oldTagName || val)
            },
        },
        'tagList':{
            handler:function(val,oldval){
                sessionStorage.setItem('tagList', JSON.stringify(val));
            },
        },
        $route(to,from){
            if(to.name === from.name || 'closeTag' === to.params.operType){
                return;
            }
            this.addTag(to.name,from.name)
            if('removeTag' === to.params.operType){
                const removeItemIndex = this.tagSortArray.findIndex(item => item === from.name)
                Vue.delete(this.tagList,from.name)
                this.tagSortArray.splice(removeItemIndex, 1)
            }
        }
    },
    created () {
       const tagListStr = sessionStorage.getItem('tagList')
       if(tagListStr){
           let tagListJson = JSON.parse(sessionStorage.getItem('tagList'))
           for(const key in tagListJson){
               let item = tagListJson[key]
               item.color = 'default'
               this.$set(this.tagList,key,item)
               this.addTagArray(item.routerUrl)
           }
       }
    },
    methods: {
        addTag(tagName,oldTagName){
            this.addTagArray(tagName)
            let item = this.list[tagName] || E404
            item.color = 'primary'
            this.$set(this.tagList,tagName,item)

            if(oldTagName !== '' && tagName !== oldTagName){
                let oldItem = this.list[oldTagName] || E404
                oldItem.color = 'default'
                this.$set(this.tagList,oldTagName,oldItem)
            }
        },
        closeTag(event, name){
            const removeItemIndex = this.tagSortArray.findIndex(item => item === name)
            Vue.delete(this.tagList,name)
            this.tagSortArray.splice(removeItemIndex, 1)

            const activiedTagName = this.tagSortArray[this.tagSortArray.length-1]
            if(activiedTagName !== this.$router.currentRoute.name){
                let item = this.list[activiedTagName] || E404
                item.color = 'primary'
                this.$set(this.tagList,activiedTagName,item)
                this.$router.push({ name: activiedTagName, params: {operType: 'closeTag'} })
            }
        },
        moveLeft() {
            // 导航条显示宽度
            const boxOffsetWidth = this.$refs.tagsBox.offsetWidth
            // 导航条实际宽度
            const bodyOffsetWidth = this.$refs.tagsBoxBody.offsetWidth
            const end = bodyOffsetWidth - boxOffsetWidth
            // 向左移动
            if(this.left+boxOffsetWidth < 0){
                this.left += boxOffsetWidth
            }else{
                this.left = 0
            }
        },
        moveRight() {
            // 导航条显示宽度
            const boxOffsetWidth = this.$refs.tagsBox.offsetWidth
            // 导航条实际宽度
            const bodyOffsetWidth = this.$refs.tagsBoxBody.offsetWidth
            const end = bodyOffsetWidth - boxOffsetWidth
            // 显示宽度大于实际宽度 表示无翻页
            if(boxOffsetWidth > bodyOffsetWidth && this.left === 0){
                return
            }
            
            // 向右移动
            if(Math.abs(this.left)+boxOffsetWidth >= end){
                this.left = 0 - end
            }else{
                this.left -= boxOffsetWidth
            }
        },
        /**
         * 这个用来给TAG排序，当关闭TAG时，激活队列里最后一个TAG
         */
        addTagArray(name){
            // 删除重复的
            const index = this.tagSortArray.indexOf(name);
            if(index > -1){
                this.tagSortArray.splice(index, 1);
            }
            this.tagSortArray.push(name)
        },
        selected(item){
            this.$router.push({ name: item.routerUrl })
        }
    }
}
</script>

<style scoped>
.nav {
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    background-color: #F0F0F0;
}

.tags_box{
    position: relative;
    flex: auto;
    padding-top: 2px;
    /* overflow-y: hidden;
    overflow-x: hidden; */
}

.tags_box_body {
    position: absolute;
    left: 0;
    padding-left: 4px;
    white-space: nowrap;
    transition: left .3s ease;
}

.tag:hover{
    cursor: pointer;
}

.btn{
    width:30px;
    border-radius: 0px;
    height:40px;
    font-size:18px;
    border:none;
    z-index: 1;
    
}

.move_btn{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}

.move_btn:hover{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
}

.btn-close {
    padding:5px 5px 6px 5px;
}
</style>
