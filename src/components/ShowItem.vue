<template>
    <div v-if="showData.length" class="col-md-9">
        <div class="show-data">
                <h2>假條一覽</h2>
                <button class="btn btn-primary btn-set" @click="printData">
                    <font-awesome-icon :icon="['fas', 'print']" />列印
                </button>
                <div class="show-item">
                    <ul>
                        <ItemList class="noBreak"
                            v-for="d in showData" 
                            :key="d.id"
                            :data="d"
                        />
                    </ul>
                </div>
        </div>
    </div>
</template>

<script>
    import ItemList from './ItemList.vue'
    export default {
        name:'ShowItem',
        props:['showData'], 
        components:{ItemList},
        methods: {
            printData(){
                window.print()
            }
        }
    }
</script>

<style scoped>
    .show-data{
        background-color:rgb(242, 241, 232);
        padding:1.5em;
        margin:0 0 3rem 0;
    }
    .show-data h2{
        display: block;
        text-align: center;
        font-size: calc(1.325rem + .9vw);
        font-weight: 600;
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
    .btn-set{
        display: block;
        margin: 0 0 1rem auto;
        text-align: center;
        font-weight: 600;
    }
</style>