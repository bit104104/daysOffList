// 預先引入樣式：這位置避免蓋過自定義樣式
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入Vue
import Vue from 'vue'

// 引入App
import App from './App.vue'
// 關閉Vue的生產提示
Vue.config.productionTip = false



// 創建Vm
new Vue({
    el:'#app',
    render: h => h(App),
    beforeCreate(){
        // 安裝全局事件總線
        Vue.prototype.$bus = this
    }
})


// 引入JS
import "bootstrap/dist/js/bootstrap.js"