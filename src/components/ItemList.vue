<template>
        <li>
            <button v-if="!data.isEdit" class="btn btn-info" @click="emitEdit(data)">編輯</button>
            <button v-if="data.isEdit" class="btn btn-info" @click="emitUpdate(data, $event)">更新</button>
            <button v-if="!data.isEdit" class="btn btn-danger" @click="emitDel(data.id)">刪除</button>
            <span v-show="!data.isEdit">{{data.day}}- {{data.hr}} hr - {{data.item}}<br></span>
            <div v-show="data.isEdit">
                <input ref="day" type="date" class="edit-form" :value="data.day">
                <span class="text-hyphen">-</span>
                <input ref="hr" type="number" class="edit-form" :value="data.hr">
                <span class="text-hyphen">-</span>
                <input ref="item" type="text" class="edit-form" :value="data.item">
            </div>
            <!-- TEST數據存日期格式
            <div>
                <p>輸出：{{test2}}</p>
                <input ref="day2" type="datetime-local" v-model="test2">
                <input ref="day2" type="datetime-local" :value="test2">
                <input ref="day2" type="datetime-local" v-model="test3">
            </div> -->


        </li>
</template>

<script>
    export default {
        name:'ItemList',
        props:['data'],
        data(){
            return{
                test:'',
                test2:'',
                selectedDateTime: null,
            }
        },
        computed:{
            test3(){
                return this.selectedDateTime = new Date(this.test)
            }
        },
        methods: {
            emitDel(id){
                this.$swal('是否刪除?', '將無法還原，此筆假條資料!', 'warning', {
                        buttons: {
                            cancel: {
                                text: "取消",
                                visible: true
                            },
                            confirm: {
                                text: "刪除",
                                visible: true
                            }
                        },
                        dangerMode: true,
                }).then((value) => {
                    // 後續要執行的動作
                    value &&
                    (id != '' ? 
                        (   this.$bus.$emit('removeItem',id),
                            this.$swal("Success", `刪除成功！`, "success") 
                        )
                        :
                        this.$swal("Error", "id空值非人為操作，請重新使用！", "error")
                    );
                })
                // confirm('是否刪除?') &&
                // (id != '' ? this.$bus.$emit('removeItem',id):alert('id不可為空值，請正確操作！'));
            },
            emitEdit(data){
                let ifEdit = Object.prototype.hasOwnProperty.call(data, 'isEdit');
                ifEdit ?  data.isEdit = ifEdit :this.$set(data, 'isEdit', !ifEdit);

            },
            emitUpdate(data){
                const updData = {
                        id:data.id,
                        day:this.$refs.day.value,
                        hr:Number(this.$refs.hr.value),
                        item:this.$refs.item.value,
                        isShow:data.isShow
                };
                let ifEdit = Object.prototype.hasOwnProperty.call(data, 'isEdit');
                let isAllnull = Object.values(updData).every(v => v != '');
                    (isAllnull && ifEdit) ? 
                    (   this.$swal("Success", `更新完成！`, "success"), 
                        data.isEdit = !ifEdit, this.$bus.$emit('updateDate', updData)
                    )
                    :
                    (   this.$swal("Error", `欄位不能填空！`, "error"), 
                        this.$set(data, 'isEdit', ifEdit)
                    );
            },

        }
    }
</script>

<style scoped>
    span{
        margin: 0 0 0 1em;
    }
    .text-hyphen{
        margin: 0 0.2rem;
    }
    input{
        margin: 1em 0 ;
    }
    .btn-info, .btn-danger{
        color: #fff;
        margin-right: 5px; 
        font-weight: 550;
    }
    .btn-info:hover, .btn-danger:hover{
        color: black;
    }
    .edit-form{
        display: inline-block;
        width: 30%;
        padding: 0.375rem 0.75rem;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0.25rem;
    }
    @media screen and (max-width: 768px) {
        .edit-form{
            width: 100%;
        }
        span{
            margin: 0;
        }
        .text-hyphen{
            display: none;
        }
    }
    @media screen and (max-width: 320px) {
        span{
            line-height: 2.5;
            display: table-cell;
        }
    }
</style>