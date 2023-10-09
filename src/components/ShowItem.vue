<template>
        <div v-if="showData.length" class="show-data">
                <h2>假條一覽</h2>
                <div class="show-item">
                    <ul>
                        <ItemList 
                            v-for="d in showData" 
                            :key="d.id"
                            :data="d"
                        />
                    </ul>
                </div>
        </div>
</template>

<script>
    import ItemList from './ItemList.vue'
    export default {
        name:'ShowItem',
        props:['showData'], 
        components:{ItemList}
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