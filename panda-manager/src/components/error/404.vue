<template>
    <div class="box">
        <div class="box_body">
            <img class="b_img" width="528" height="398" src="../../assets/error_404.png"  />
            <div class="box_content">
                <div class="box_content_error">404</div>
                <div class="box_content_msg">抱歉，你访问的页面不存在</div>
                <div class="box_content_btn"><Button to="/work" type="primary">返回工作台</Button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error_404'
}
</script>

<style>

.box{
    text-align: center;
}

.box_body{
    position: relative;
    top: 150px;
    display:inline-flex;
}

.b_img{
    float: left;
}
.box_content{
    float: left;
    width: 400px;
    height: 398px;
    text-align: left;
    margin-left: 40px;
    margin-top: 40px;
}
.box_content_error{
    font-size: 150px;
}
.box_content_msg{
    font-size: 30px;
    color:rgb(95, 95, 95);
}
.box_content_btn{
    margin-top: 10px;
}
</style>
