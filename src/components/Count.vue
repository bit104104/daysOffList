<template>
        <div class="row count-days">
            <h2 class="d-flex flex-wrap col-auto"
                v-for="(count,index) in countDaysOff" :key="index">
                <h4>{{title[index]}}<br>{{count}}</h4>
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
    .count-days{
        text-align: center;
        color: white;
        justify-content: center;
    }
    h2{
        background-color:rgba(97, 225, 68, 0.832);
    }
</style>