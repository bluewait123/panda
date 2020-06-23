<template>
    <div>
        <div class="wrap">
            <div class="box1">此为正面</div> 
            <div class="box2">此为背面</div>
        </div>
        <button>翻转</button>
    </div>
</template>

<script>
export default {
    name: 'test',
    methods: {
        loop() {
            
        }
    }
}
</script>

<style>
/* 保证正反面一样大，不然反转会很突兀*/
    .wrap,.box1,.box2{
        width: 200px;                
        height: 200px;
    }
    .wrap{
        position: relative;
    }
            /*使正反面在同一位置*/
    .box1,.box2{
        position: absolute;
        top: 0;
        left: 0;
        transition: all 1s;
        backface-visibility:hidden;    /*这个属性至关重要，当元素不面向屏幕时不可见，不然的话上面的div翻转180度后还是覆盖在下面的div上*/
    }
    .box1{
        background-color: red;
                    /*使正面在上面*/
        z-index: 2;
    }
    .box2{
        background-color: green;
                    /*先使背面翻转180度，当和正面一起翻转时正好背面作为正面*/
        transform: rotateY(180deg);
    }
    .wrap:hover .box2{
                    /*背面作为正面*/
        transform: rotateY(0deg);
    }
    .wrap:hover .box1{
                    /*正面作为背面*/
        transform: rotateY(180deg);
    }
</style>
