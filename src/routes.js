import AC from './components/async_load'

export default [
    {
        name:'首页',
        icon:'home',
        path:'/',
        component:AC(()=> import('./views/home'))
    }
]