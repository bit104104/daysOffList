<template>
        <div id="root">
            <div class="todo-container2">
                <div class="reset-btn">
                    <button class="btn btn-danger" @click="emptyAllItem">清空假條資料</button>
                    <button class="btn btn-danger" @click="resetDaysOff">特休天數重置</button>
                </div>

                <div class="todo-wrap2">
                    <Count :countDaysOff="countDaysOff" />
                    <AddItem />
                    <ShowItem :showData="ShowData"/>
                </div>
            </div>
        </div>
</template>

<script>
    import AddItem from './components/AddItem'
    import Count from './components/Count'
    import ShowItem from './components/ShowItem'
    // 引入axios
    import axios from 'axios'

    export default {
        name:'App',
        components:{Count, AddItem, ShowItem},
        data(){
            return {
                // allDaysOff:3,
                allDaysOff:JSON.parse(localStorage.getItem('allDaysOff')) || 0,
                workHr:8,
                oneHourNum:0.125,
                dayoffList:JSON.parse(localStorage.getItem('dayoffList')) || [],
                // dayoffList:[
		        //     {id:nanoid(), day:'2022/08/07', hr:8, item:'特休', isShow:true},
                // ]
            }
        },
        computed:{
            hr_count(){
                const hr = this.dayoffList.filter(　item　=>　item.isShow　&&　item.hr).map(value => value.hr && value.hr);
                const initialValue = 0;
                const hr_count = hr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
                return hr_count
            },
            countDaysOff(){
                const x = [ this.allDaysOff, this.hr_count,];
                const y = x.map((item,i)=>{
                    // if(x[0] == 0){ return `0天`}
                    let calc = (i == 0) ? item - (x[1] / this.workHr) : (item / this.workHr);
                    let day_calc = Math.trunc(calc);
                    let hr_calc = (calc - day_calc) / this.oneHourNum;
                    // let title = (i != 0 && i==1) ? '剩餘':'已請';
                    return `${day_calc} 天 ${hr_calc} 小時`
                });
                y.unshift(`${x[0]} 天`);
                return y
            },
            ShowData(){
                const arr = this.dayoffList;
                const GetDayoffList = arr.filter( item =>{
                    return item.isShow && item;
                });
                // console.log('APP發送數據給，ShowItem~');
                // this.$bus.$emit('getData',GetDayoffList);
                return GetDayoffList;
            }
        },
        methods: {
            addAllDaysOff(val){
                this.allDaysOff = Number(this.allDaysOff + val);
            },
            AddDayItem(newItemObj){
                this.dayoffList.push(newItemObj);
            },
            removeItem(id){
                // this.dayoffList.forEach(item =>{
                //     return item.id == id && (item.isShow= !item.isShow)
                // })
                // 過濾後無法查看被刪除的數據(vue devtool)_但可達到只刪除某一筆數據的作用
                this.dayoffList = this.dayoffList.filter(item => item.id !== id)
            },
            updateDate(data){
                this.dayoffList.forEach(v => {
                    if(v.id == data.id){
                        v.day = data.day;
                        v.hr = data.hr;
                        v.item = data.item;
                    }
                })
            },
            emptyAllItem(){
                // 這樣設定雖會清空，但vue不會監視到數據變化而自動刷新模板(只能頁面刷新)
                // 指定響應式數據為空，促使模板更新
                localStorage.removeItem('dayoffList');
                this.dayoffList = [];
            },
            resetDaysOff(){
                localStorage.removeItem('allDaysOff');
                this.allDaysOff = 0;
            }
        },
        watch:{
            dayoffList:{
                deep:true,
                handler(val){
                    localStorage.setItem('dayoffList', JSON.stringify(val));
                }
            },
            allDaysOff:{
                handler(val){
                    localStorage.setItem('allDaysOff', JSON.stringify(val));
                }
            }
        },
        mounted() {
            this.$bus.$on('addAllDaysOff', this.addAllDaysOff);
            this.$bus.$on('AddDayItem', this.AddDayItem);
            this.$bus.$on('removeItem', this.removeItem);
            this.$bus.$on('updateDate', this.updateDate);
            // 自定義事件
            // this.$refs.AddDayItem.$on('AddDayItem', this.AddDayItem)

            // axios test_內網待研究
            // axios.get('./server/api/data')
            // 跨域OK
            /* 
            axios.get('http://localhost:3000/api/data')
                .then(res =>{
                    this.express_return = res.data;
                })
                .catch( err =>{
                    console.error(err);
                    this.express_return = err;
                });
            */
        },
        beforeDestory(){
            this.$bus.off('addAllDaysOff');
            this.$bus.off('AddDayItem');
            this.$bus.off('removeItem');
            this.$bus.off('updateDate');
        }
    }
</script>

<style>
    /*base*/
    body {
    background: #fff;
    }

    .btn {
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }
    .btn-edit {
        color: #fff;
        background-color: #1b64be;
        border: 1px solid #124078;
        margin-right: 5px;
    }

    .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
    }
    .btn-edit:hover {
    color: #fff;
    background-color: #124078;
    } 
    .reset-btn{
        background-color: #7f7ebd;
    }

    .btn:focus {
    outline: none;
    }

    .todo-container {
    width: 600px;
    margin: 0 auto;
    }
    .todo-container .todo-wrap {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    /* holiday_count */
    .todo-container2 {
        width: 600px;
        margin: 0 auto;
        min-width: 320px;
        max-width: 800px;
        margin: 0 auto;

    }
    .todo-container2 .todo-wrap2 {
        width: 100%;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        border: 2px solid #2f2f2f;
        border-radius: 5px;
    }

</style>