<template>
        <div class="show-data">
                <h2>假條一覽</h2>
                <div class="show-item">
                    <ul>
                        <ItemList2 
                            v-for="d in showData" 
                            :key="d.id"
                            :data="d"
                            v-bind="$attrs"
                        />
                    </ul>
                </div>
        </div>
</template>

<script>
    import ItemList2 from './ItemList2.vue'
    export default {
        name:'ShowItem2',
        props:['showData'], 
        components:{ItemList2},
        data(){
            return {
                msg:'6666'
            }
        }
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
</style>