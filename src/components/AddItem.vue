<template>
        <div class="setting-data">
            <div class="add">
                <h2>新增</h2>
                <div>
                    <div class="add-list">
                        <h3>請假條</h3>
                            <label for="day">日期</label>
                            <input type="date" v-model="addItem.day">
                            <label for="hr">時數</label>
                            <input type="number"
                                    v-model.number="addItem.hr"
                                    min="1" max="8" step="1"
                            >
                            <label for="item">事由</label>
                            <input type="text" v-model="addItem.item">
                            <button @click="add">新增</button>
                    </div>
                    
                    <div class="add-holiday">
                        <h3>特休天數</h3>
                        <label for="天數">輸入整數</label>
                        <input type="number" required 
                                v-model.number="addDays"
                                min="0" max="31" step="1"
                        >
                        <button @click="add_day">新增</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    export default {
        name:'AddItem',
        data(){
            return {
                addDays:0,
                addItem:{id:nanoid(), day:'', hr:0, item:'', isShow:true}
            }
        },
        methods:{
            add_day(){
                this.$bus.$emit('addAllDaysOff', this.addDays);
                this.addDays = 0;
            },
            add(){
                // 自定義事件-子傳父組件
                // this.$emit('AddDayItem', this.addItem);
                this.$bus.$emit('AddDayItem', this.addItem);
                this.addItem = {id:nanoid(), day:'', hr:0, item:'', isShow:true};
            },
        }
    }
</script>

<style scoped>
    .setting-data{
        background-color:rgb(197, 177, 146);
        width:70%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
    }

    .add{
        background-color:rgb(242, 241, 232);
        width: 100%;
        text-align: center;
    }
    .add > div{
        display: flex;
        justify-content: space-evenly;
        border-radius:1em
    }
    .add-list{
        width: 60%;
        padding: 0 1em 2em;
        /* background-color:rgb(255, 235, 122); 
        border:2px solid coral;
        border-radius:1em;*/
    }
    .add-list label, .add-holiday label{
        text-align: left;
    }
    .add-holiday{
        /* background-color:lightgreen; */
        /* border:2px solid coral; */
        border-radius:2em;
        width:20%;
    }
   .add-list, .add-holiday{
        display: inline-flex;
        flex-flow: column;
    }
    @media screen and (max-width: 960px) {
        .add-list, .add-holiday{
            /* flex-flow: column; */
            width:100%;
        }
    }
</style>