<template>
        <div class="count-days">
            <h2 class="mb-0"
                v-for="(count,index) in countDaysOff" :key="index">
                <h4>
                    <p v-if="( index == 0 && count=='0 天')">請新增天數</p>
                    <p v-if="( (index == 1 && count=='0 天 0 小時') && (countDaysOff[0] != '0 天'))">特休假請完</p>
                    {{title[index]}}
                    <br>
                    {{count}}
                </h4>
            </h2>
        </div>
</template>

<script>
    export default {
        name:'Count',
        props:['countDaysOff'], 
        data(){
            return {
                title:['特休總計', '剩餘', '已請'],
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .count-days{
        text-align: center;
        color: white;
        background: #53636e;
        display: inline-flex;
        justify-content: center;
        height: 20vh;
        border-radius: 0 0 50% 50%;
        position: sticky;
        top:0;
        align-items: start;
    }
    /* .count-days h2, .count-days h4{
        margin: 0;
    } */
    .count-days h2{
        height: 20vh;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 50% 50%;
        width: calc(100% / 3);
    }
    .count-days h4{
        line-height: 1.5;
        font-weight: 600;
    }
    .count-days p{
        color: rgb(252 205 65);
        font-size: 1rem;
    }
    @media screen and (max-width: 576px) {
        .count-days h4{
            font-size: medium;
            white-space:pre-wrap;
        }
    }

</style>