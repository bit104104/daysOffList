<template>
        <div class="col-md-9 setting-data">
            <div class="add">
                <h2>新增</h2>
                <div>
                    <div v-show="allDaysOff" class="add-list">
                        <h3>請假條</h3>
                            <label for="day" class="form-label">日期</label>
                            <input type="date" class="form-control" id="day" v-model="addItem.day">

                            <label for="hr" class="form-label">時數</label>
                            <input type="number" class="form-control" 
                                    id="hr" v-model.number="addItem.hr"
                                    min="0" max="8" step="1"
                            >
                            <label for="item" class="form-label">事由</label>
                            <input type="text" class="form-control" id="item" v-model="addItem.item">
                            <button @click="add" class="btn btn-primary">新增</button>
                    </div>
                    
                    <div class="add-holiday">
                        <h3>特休天數</h3>
                        <label for="addDays" class="form-label">新增天數</label>
                        <input type="number" class="form-control" 
                                id="addDays" required
                                v-model.number="addDays"
                                min="0" max="31" step="1"
                        >
                        <button @click="add_day"class="btn btn-primary">新增</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    export default {
        name:'AddItem',
        props:['allDaysOff'],
        data(){
            return {
                addDays:0,
                addItem:{id:nanoid(), day:'', hr:0, item:'', isShow:true},
                errorMessage:[
                    {id:0, message:'不可為負值！'},
                    {id:0, message:'時數只能填寫，1-8小時！'},
                    {id:0, message:'不能為空值 或 0！'},
                ]
            }
        },
        computed:{
            updatedId(){
                let i = 0;
                return this.errorMessage.map((item)=>{
                    i++
                    return item.id = i ;
                })
            }
        },
        methods:{
            add_day(){
                if(this.addDays<0){
                    return this.$swal("Error", this.errorMessage[0].message, "error");
                }
                this.$bus.$emit('addAllDaysOff', this.addDays);
                this.addDays = 0;
            },
            add(){
                let isNull = (this.addItem.hr == "");
                if(isNull){
                    return this.$swal("Error", `時數必填，${this.errorMessage[2].message}`, "error")
                }
                let islessHr = (this.addItem.hr<0);
                let ismoreHr = (this.addItem.hr>8);
                if(islessHr || ismoreHr){
                    return this.$swal("Error", this.errorMessage[1].message, "error");
                }
                // 自定義事件-子傳父組件
                // this.$emit('AddDayItem', this.addItem);
                this.$bus.$emit('AddDayItem', this.addItem);
                this.addItem = {id:nanoid(), day:'', hr:0, item:'', isShow:true};
            }
        },
        watch:{
            updatedId(newValue){
                this.errorMessage = newValue;
            }
        }
    }
</script>

<style scoped>
    .add{
        background-color:rgb(242, 241, 232);
        width: 100%;
        text-align: center;
        padding:1.5em 0;
    }
    .add > div{
        display: flex;
        justify-content: space-around;
    } 
    .add h2{
        font-size: calc(1.325rem + .9vw);
        font-weight: 600;
    }
    .add-list{
        width: 60%;
        border-radius:12px;
        padding: 1em;
        background: rgb(192 223 211);
    }
    .add h3{
        font-size: calc(1rem + .6vw);;
        font-weight: 550;
    }

    .add-list label, .add-holiday label{
        text-align: left;
        margin:0.75em 0 0 0;
    }

    .add-holiday{
        background: rgb(192 223 211);
        border-radius:12px;
        padding: 1em;
        width:30%;
    }
   .add-list, .add-holiday{
        display: inline-flex;
        flex-flow: column;
        border-top: 3px dashed rgb(146, 173, 163);
        border-bottom: 3px dashed rgb(146, 173, 163);
    }
    .add-list button, .add-holiday button{
        margin:0.75em 0;
    }
    @media screen and (max-width: 960px) {
        .add-list, .add-holiday{
            width:100%;
        }
    }
</style>