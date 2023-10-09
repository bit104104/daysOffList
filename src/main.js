// 預先引入樣式：這位置避免蓋過自定義樣式
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 關閉Vue的生產提示
Vue.config.productionTip = false


// 引入fortawesome package_ver5.15.4
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
//引入 fortawesome npm install --save-dev @fortawesome/fontawesome-free
// 模板使用：<i class="fa-solid fa-power-off"></i>
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'

// 引入sweetalert
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

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