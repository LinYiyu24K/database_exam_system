import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import AppForgetPassword from '@/pages/login/AppForgetPassword'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'
import HelloWorld from '@/components/HelloWorld'
import TheLayout from '@/pages/layout/TheLayout'
import FuncHome from '@/pages/functions/home/FuncHome'
import UserInfo from '@/pages/functions/forms/UserInfo'
import UserLists from '@/pages/functions/forms/UserLists'

/* 静态页面路由 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index'
  }, {
    path: '/login',
    name: '登录',
    component: AppLogin
  }, {
    path: '/register',
    name: '注册',
    component: AppRegister
  }, {
    path: '/forgetPassword',
    name: '忘记密码',
    component: AppForgetPassword
  },
//   {
//     path: '/index',
//     name: '首页',
//     component: HelloWorld
//   }, 
  {
    path: '/',
    component: TheLayout,
    menu: true,
    children: [
      {
        path: '/index',
        alias: '/home',
        name: '首页',
        icon: 'el-icon-star-off',
        component: FuncHome
      }
    ]
  }, {
    path: '/',
    component: TheLayout,
    menu: true,
    name: '用戶管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/userInfo',
        name: '个人信息',
        component: UserInfo
      }, {
        path: '/forms/userLists',
        name: '用戶列表',
        component: UserLists
      }, {
        path: '/forms/importUser',
        name: '添加用户',
        component: AppRegister
      }
    ]
  },{
    path: '/error/401',
    name: '错误401',
    meta: {errorPage: true},
    component: AppError401
  }, {
    path: '*',
    name: '错误404',
    meta: {errorPage: true},
    component: AppError404
  }
]

export default staticRouter