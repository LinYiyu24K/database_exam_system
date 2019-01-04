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
    name:'首页',
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
    name: '用户管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/userInfo',
        name: '个人信息',
        component: UserInfo
      }, {
        path: '/forms/userLists',
        name: '用户列表',
        component: UserLists
      }, {
        path: '/forms/importUser',
        name: '添加用户',
        component: AppRegister
      }
    ]
  }, {
    path: '/',
    component: TheLayout,
    menu: true,
    name: '学生管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/userLists',
        name: '学生信息',
        icon: 'el-icon-menu',
        component: UserLists
      }
    ]
  }, {
    path: '/',
    component: TheLayout,
    menu: true,
    name: '题库管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/importUser',
        name: '单选题录入',
        component: AppRegister
      },
      {
        path: '/forms/userLists',
        name: '单选题管理',
        component: UserLists
      },
      {
        path: '/forms/importUser',
        name: '判断题录入',
        component: AppRegister
      },
      {
        path: '/forms/userLists',
        name: '判断题管理',
        component: UserLists
      },
      {
        path: '/forms/importUser',
        name: '多选题录入',
        component: AppRegister
      },
      {
        path: '/forms/userLists',
        name: '多选题管理',
        component: UserLists
      }
    ]
  },{
    path: '/',
    component: TheLayout,
    menu: true,
    name: '试卷管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/userLists',
        name: '试卷制作',
        component: UserLists
      },
      {
        path: '/forms/userLists',
        name: '试卷维护',
        component: UserLists
      }
    ]
  },{
    path: '/',
    component: TheLayout,
    menu: true,
    name: '考试管理',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/forms/userLists',
        name: '发布考试',
        component: UserLists
      },
      {
        path: '/forms/userLists',
        name: '学生成绩',
        component: UserLists
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