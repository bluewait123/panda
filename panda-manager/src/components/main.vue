<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <!-- <img src="logo.png" width="291" height="44" style="border-radius: 4px; margin-top:10px;" /> -->
                    <div class="layout-nav">
                        <MenuItem name="nickName">
                            <Icon type="ios-navigate"></Icon>
                            <span>{{nickName}}</span>
                        </MenuItem>
                        <!-- <MenuItem name="exit" :to="signOut()">
                            <Icon type="md-exit"></Icon>
                            <span>退出登录</span>
                        </MenuItem> -->
                    </div>
                </Menu>
            </Header>
            <Layout :style="{minHeight: 'calc(100vh - 64px)'}">
                <Sider>
                    <Menu ref="side_menu" theme="dark" width="auto" :active-name="activeName" :open-names="openNames" @on-select="toPage">
                        <template v-for="(val,key) in menus" >
                            <MenuItem v-if="!val.childs" :name="val.routerUrl" :key="key">
                                <Icon :type="val.icon"></Icon>
                                <span>{{val.name}}</span>
                            </MenuItem>
                            <Submenu v-if="val.childs" :name="val.routerUrl" :key="val.id">
                                <template slot="title">
                                    <Icon :type="val.icon"></Icon>
                                    <span>{{val.name}}</span>
                                </template>
                                <template v-for="(cval,ckey) in val.childs">
                                    <MenuItem :name="cval.routerUrl" :key="cval.id">
                                        <Icon :type="cval.icon"></Icon>
                                        <span>{{cval.name}}</span>
                                    </MenuItem>
                                </template>
                            </Submenu>
                            <!-- <Submenu v-if="val.parentId === '0'" :name="key" :key="val.routerUrl">
                                <template slot="title">
                                    <Icon :type="val.icon"></Icon>
                                    <span>{{val.name}}</span>
                                </template>
                                <template v-for="(cval,ckey) in menus">
                                    <MenuItem v-if="cval.parentId === val.id" :name="ckey" :key="cval.routerUrl">
                                        <Icon :type="cval.icon"></Icon>
                                        <span>{{cval.name}}</span>
                                    </MenuItem>
                                </template>
                            </Submenu> -->
                        </template>
                    </Menu>
                </Sider>
                <Layout>
                    <tags-nav :list="list" :defaultTag="defaultTag"/>
                    
                    <Layout>
                        <Content class="content">
                            <keep-alive>
                                <router-view v-if="$route.meta.keepAlive"></router-view>
                            </keep-alive>
                            <router-view v-if="!$route.meta.keepAlive"></router-view>
                        </Content>
                    </Layout>
                    
                    <!-- <Breadcrumb :style="{margin: '24px 0'}" v-show="breadcrumbControl()">
                        <template v-for="item in $breadcrumbs.list">
                            <BreadcrumbItem :name="item.name" :key="item.name" :to="item.url">
                                <Icon :type="item.icon"></Icon>
                                <span>{{item.name}}</span>
                            </BreadcrumbItem>
                        </template>
                    </Breadcrumb>
                    <Content>
                        <router-view/>
                    </Content> -->
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import tagsNav from './tags-nav.vue'

export default {
    name: "Main",
    components: {
        tagsNav
    },
    data () {
        return {
            nickName : localStorage.getItem('nickName'),
            menus: {},
            list:{},
            defaultTag: '',
            openNames:[],
            activeName:'work',
        }
    },
    created () {
        this.loadMenu()
    },
    watch : {
        'openMenu' :{
            handler:function(val,oldval){
                console.log(val)
            },
        }
    },
    methods : {
        loadMenu () {
            this.$http.post('/common/resource/list', {}).then(res => {
                let menusList = {}
                res.data.data.list.forEach((item,index,arr) => {
                    if(item.parentId === '0'){
                        menusList[item.id] = item
                    }else{
                        if(menusList[item.parentId]){
                            let childs = menusList[item.parentId].childs || []
                            childs.push(item)
                            menusList[item.parentId].childs = childs
                        }else{
                            menusList[item.id] = item
                        }
                    }

                    let {...cloneItem} = item
                    this.list[item.routerUrl] = cloneItem
                })
                
                // 更新菜单信息
                for(let idx in menusList){
                    const item = menusList[idx]
                    this.$set(this.menus,item.id,item)
                }
                
                // 设置默认页
                this.defaultTag = this.$router.currentRoute.name
                this.setDefaultMenus();

                // 刷新菜单
                this.refreshMenus()
            })
        },
        setDefaultMenus(){
            const currnetUrl = this.$router.currentRoute.name
            const item = this.list[currnetUrl]
            this.activeName = currnetUrl
            if(item.parentId !== '0'){
                const pItem = this.menus[item.parentId]
                this.openNames.push(pItem.routerUrl)
            }

        },
        refreshMenus(){
            this.$nextTick(()=>{
                this.$refs.side_menu.updateOpened()
                this.$refs.side_menu.updateActiveName()
            })
        },
        toPage (routerName) {
            // 跳转路由
            if(routerName !== this.$router.currentRoute.name){
                this.activationTag = routerName
                this.$router.push({ name: routerName })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        height: 100%;
        overflow: hidden;
    }
   
    .layout-nav{
        float: right;
        margin: 0 auto;
        margin-right: 20px;
    }

    .content {
        padding: 10px;
        overflow: auto
    }
</style>
