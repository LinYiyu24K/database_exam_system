import AppLogin from '@/pages/login/AppLogin'
import AppRegister from '@/pages/login/AppRegister'
import AppForgetPassword from '@/pages/login/AppForgetPassword'
import AppError401 from '@/pages/error/AppError401'
import AppError404 from '@/pages/error/AppError404'
import TheLayout from '@/pages/layout/TheLayout'
import FuncHome from '@/pages/functions/home/FuncHome'
import UserInfo from '@/pages/functions/forms/userManagement/UserInfo'
import UserLists from '@/pages/functions/forms/userManagement/UserLists'
import ModifyPassword from '@/pages/functions/forms/userManagement/ModifyPassword'
import StudentLists from '@/pages/functions/forms/studentManagement/StudentLists'
import SingleChoice from '@/pages/functions/forms/exerciseManagement/SingleChoice'
import MultipleChoice from '@/pages/functions/forms/exerciseManagement/MultipleChoice'
import Judgement from '@/pages/functions/forms/exerciseManagement/Judgement'
import QuestionLists from '@/pages/functions/forms/exerciseManagement/QuestionLists'
import Synthesis from '@/pages/functions/forms/exerciseManagement/Synthesis'
import MakeTestpaper from '@/pages/functions/forms/testpaperManagement/MakeTestpaper'
import TestpaperLists from '@/pages/functions/forms/testpaperManagement/TestpaperLists'
import PublishTest from '@/pages/functions/forms/testManagement/PublishTest'
import ExaminationInfo from '@/pages/functions/forms/testManagement/ExaminationInfo'
import StudentGrade from '@/pages/functions/forms/testManagement/StudentGrade'
// import GetStudentGrade from '@/pages/functions/forms/testManagement/GetStudentGrade'
import TakeExamination from '@/pages/functions/forms/testManagement/TakeExamination'


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
    path: '/modifyPassword',
    name: '忘记修改密码',
    component: ModifyPassword
  }, {
    path: '/takeExamination',
    name: '考试',
    component: TakeExamination
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
        path: '/forms/userInfo',
        name: '个人信息',
        component: UserInfo
      },{
        path: '/forms/examinationInfo',
        name: '考试信息',
        component: ExaminationInfo
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
        path: '/forms/singleChoice',
        name: '单选题录入',
        component: SingleChoice
      },
      {
        path: '/forms/judgement',
        name: '判断题录入',
        component: Judgement
      },
      {
        path: '/forms/multipleChoice',
        name: '多选题录入',
        component: MultipleChoice
      },
      {
        path: '/forms/synthesis',
        name: '综合题录入',
        component: Synthesis
      },
      {
        path: '/forms/questionLists',
        name: '题目管理',
        component: QuestionLists
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
        path: '/forms/makeTestpaper',
        name: '试卷制作',
        component: MakeTestpaper
      },
      {
        path: '/forms/testpaperLists',
        name: '试卷列表',
        component: TestpaperLists
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
        path: '/forms/publishTest',
        name: '发布考试',
        component: PublishTest
      },
      {
        path: '/forms/studentGrade',
        name: '学生成绩',
        component: StudentGrade
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