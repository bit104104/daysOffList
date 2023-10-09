<template>
        <li>
            {{test}}
            <div class="btn-area">
                <button v-if="!data.isEdit" class="btn btn-edit" @click="emitEdit(data)">編輯</button>
                <button v-if="data.isEdit" class="btn btn-edit" @click="emitUpdate(data, $event)">更新</button>
                <button class="btn btn-danger" @click="emitDel(data.id)">刪除</button>
                <span v-show="!data.isEdit">{{data.day}}- {{data.hr}}hr - {{data.item}}<br></span>
            </div>
            <div v-show="data.isEdit">
                <input ref="day" type="text" :value="data.day">
                -<input ref="hr" type="number" :value="data.hr">
                -<input ref="item" type="text" :value="data.item">
            </div>
        </li>
</template>

<script>
    export default {
        name:'ItemList2',
        props:['data','test'],
        methods: {
            emitDel(id){
                confirm('是否刪除?') &&
                (id != '' ? this.$bus.$emit('removeItem',id):alert('id不可為空值，請正確操作！'));
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
                    (data.isEdit = !ifEdit, this.$bus.$emit('updateDate', updData))
                    :
                    (alert('欄位不能填空！'), this.$set(data, 'isEdit', ifEdit));
            }
        },  
    }
</script>

<style scoped>
    .show-data{
        width:100%;
        background: lightcyan;
    }
    .show-data h2{
        display: block;
        text-align: center;
        margin: 0.5rem auto;
    }
    .show-item{
        height:20vh;
        overflow-y: scroll;
        margin: 0 auto;
        border-top:  2px rgb(15, 158, 156) dashed;
    }
    .show-item ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
        text-align: left;
    }
    .show-item ul li{
        padding: 0.5rem;
        border-bottom: 2px rgb(15, 158, 156) dashed;
    }
    span{
        margin: 0 0 0 1em;
    }
    input{
        margin: 1em 0 ;
        width: 25%;
    }
</style>