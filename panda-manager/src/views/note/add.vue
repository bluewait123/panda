<template>
    <div>
        <div class="oper_div">
            <Button class="oper_btn" type="primary">新增</Button>
            <Button class="oper_btn" type="success">保存</Button>
        </div>
        <div>
            <Card>2</Card>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'note_add'
}
</script>

<style>
    .oper_div{
        margin-bottom: 10px;
        text-align: right;
    }

    .oper_btn{
        margin-left: 10px;
    }
</style>
