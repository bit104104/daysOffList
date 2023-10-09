<template>
        <div class="col-md-9">
            <div class="clear-area">
                <button type="button" class="btn btn-clear" @click="emptyAllItem">
                    <font-awesome-icon :icon="['fas', 'trash-alt']" />
                    清空假條資料
                </button>
                <button type="button" class="btn btn-reset" @click="resetDaysOff">
                    <font-awesome-icon :icon="['fas', 'undo']" />
                    特休天數歸零
                </button>
            </div>
        </div>
</template>

<script>
    export default {
        name:'ClearData',
        props:['emptyAllItem', 'resetDaysOff'],
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .clear-area{
        margin-top: 3rem;
    }
    .btn-clear, .btn-reset{
        width: calc((100% - 10px)/2);
        color: rgb(0, 0, 0);
        border: 2px  solid #72857e;
        font-weight: 600;
        font-size: calc(0.5rem + .9vw);
    }
    .btn-clear:hover, .btn-reset:hover{
        color: rgb(255, 255, 255);
        background-color: #72857e;
    }
    .btn-clear{
        margin-right:5px;
    }
    .btn-reset{
        margin-left:5px;
    }
</style>