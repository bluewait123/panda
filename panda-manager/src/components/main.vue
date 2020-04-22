<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <!-- <img src="logo.png" width="291" height="44" style="border-radius: 4px; margin-top:10px;" /> -->
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{minHeight: '100vh'}">
                <Sider>
                    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                <span>Item 1</span>
                            </template>
                            <MenuItem name="1-1">
                                <span>Option 1</span>
                            </MenuItem>
                            <MenuItem name="1-2"><span>Option 2</span></MenuItem>
                            <MenuItem name="1-3"><span>Option 3</span></MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                <span>Item 2</span>
                            </template>
                            <MenuItem name="2-1"><span>Option 1</span></MenuItem>
                            <MenuItem name="2-2"><span>Option 2</span></MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                <span>Item 3</span>
                            </template>
                            <MenuItem name="3-1"><span>Option 1</span></MenuItem>
                            <MenuItem name="3-2"><span>Option 2</span></MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    name: "main"
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
</style>
