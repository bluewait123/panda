<template>
    <div id="box">
        <!--  -->
        <div class="login_box">
            <Card title="欢迎登录" shadow>
                <Form ref="loginForm" :model="info" :rules="rule" inline @keydown.enter.native="requestLogin">
                    <FormItem class="form_item" prop="mobile">
                        <Input type="text" size="large" v-model="info.mobile" placeholder="请输入手机号" maxlength="11">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="form_item" prop="password">
                        <Input type="password" size="large" v-model="info.password" placeholder="请输入用户密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="form_item">
                        <Button long type="primary" @click="login()">登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
import md5 from '@/utils/md5.js'

export default {
    name : 'login',
    data () {
        return {
            info: {
                mobile: '',
                password: ''
            },
            rule: {
                user: [
                    { required: true, validator: this.$rule.phone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '用户密码不能为空!', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度需6位字符以上!', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        login() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    const mobile = this.info.mobile
                    const encryptionPwd = md5.getMD5BySalt(this.info.password,mobile)
                    const reqData = {
                        mobile: mobile,
                        pwd: encryptionPwd
                    }
                    this.$http.post('/login', reqData).then(resp => {
                        localStorage.clear()
                        const respData = resp.data.data
                        this.setCache(respData)
                        this.$Message.success('登录成功!')
                        this.$router.push({name: 'work'})
                    })
                }
            })
        },
        setCache (item) {
            localStorage.setItem('token', item.token)
            localStorage.setItem('nickName', item.nickName)
        }
    }
}

</script>

<style lang="less" scoped>
    body{
        margin: 0;
        padding: 0;
    }

    #box{
        width: 100vw;
        height: 100vh;
        background-image: url('../assets/login_backgroud.jpg');
        background-repeat:no-repeat; 
        background-size:100% 100%;
        -moz-background-size:100% 100%;
        text-align: center;
    }

    .login_box{
        position: relative;
        top: 150px;
        width: 350px;
        height: 250px;
        display:inline-flex;
    }

    .form_item{
        width: 90%;
    }
</style>
