//引入动态加载
import AC from './components/async_load' 

export default [
    {
        name: '首页',
        icon: 'home',
        exact:true,
        path: '/',
        component: AC(() => import('./views/home'))
    },
    {
        name: '详情页',
        exact: true,
        path: '/detail/:id',
        component: AC(() => import('./views/movie/detail'))
      }
]