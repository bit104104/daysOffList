<template>
        <div id="root" class="container">
            <div class="row justify-content-center">
                <Count :countDaysOff="countDaysOff"/>
                <ClearData
                    class="noPrint"
                    :emptyAllItem="emptyAllItem" 
                    :resetDaysOff="resetDaysOff"
                />
                <AddItem class="noPrint" :allDaysOff="allDaysOff"/>
                <ShowItem :showData="ShowData"/>
            </div>
        </div>
</template>

<script>
    import AddItem from './components/AddItem'
    import Count from './components/Count'
    import ShowItem from './components/ShowItem'
    import ClearData from './components/ClearData'
    import './css/print.less'
    // 引入axios
    import axios from 'axios'

    export default {
        name:'App',
        components:{Count, AddItem, ShowItem, ClearData},
        data(){
            return {
                allDaysOff:JSON.parse(localStorage.getItem('allDaysOff')) || 0,
                workHr:8,
                oneHourNum:0.125,
                dayoffList:JSON.parse(localStorage.getItem('dayoffList')) || [],
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
                    let calc = (i == 0) ? item - (x[1] / this.workHr) : (item / this.workHr);
                    let day_calc = Math.trunc(calc);
                    let hr_calc = (calc - day_calc) / this.oneHourNum;
                    return (day_calc<0 || hr_calc<0) ? `0 天 0 小時` : `${day_calc} 天 ${hr_calc} 小時`
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
                this.$swal('是否清空?', '清空後將無法還原資料!', 'warning', {
                        buttons: {
                            cancel: {
                                text: "取消",
                                visible: true
                            },
                            confirm: {
                                text: "清空",
                                visible: true
                            }
                        },
                        dangerMode: true,
                }).then((value) => {
                    if(value == true) {
                        localStorage.removeItem('dayoffList');
                        this.dayoffList = [];
                        this.$swal("Success", `清空成功！`, "success");
                    }
                })
            },
            resetDaysOff(){
                this.$swal('特休總計是否歸零?', '總計天數會重置，但原有的假條資料會保留!', 'warning', {
                        buttons: {
                            cancel: {
                                text: "取消",
                                visible: true
                            },
                            confirm: {
                                text: "歸零",
                                visible: true
                            }
                        },
                        dangerMode: true,
                }).then((value) => {
                    if(value == true) {
                        localStorage.removeItem('allDaysOff');
                        this.allDaysOff = 0;
                        this.$swal("Success", `歸零成功！`, "success");
                    }
                })
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
<style lang="css">
    body{
        background: rgba(0, 0, 0, 0.694);
    }
    #root{
        background: lightblue;
    }
</style>