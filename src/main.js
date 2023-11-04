import App from './App.vue'
import VueRouter from 'vue-router'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ChannelList from './components/ChannelComponent/ChannelList'
import LoginComponent from "@/components/LoginComponent/LoginComponent";
import MainComponent from "@/components/MainComponent/MainComponent";
import SensitiveComponent from '@/components/SensitiveComponent/SensitiveComponent'
import RealNameComponent from '@/components/RealNameComponent/RealNameComponent'
const routes = [
    {
        path: '/main',
        component: MainComponent,
        children: [
            {path: '/main/channel', component: ChannelList},
            {path: '/main/sensitive', component: SensitiveComponent},
            {path: '/main/realname', component: RealNameComponent},
        ]
    },
    {path: '/login',component: LoginComponent},
    {path: '/',redirect:'/login'}

]

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

Vue.use(ElementUI)
    .use(VueRouter)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

