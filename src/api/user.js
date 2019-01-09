import {request,requestGET} from '../utils/request'

//登陆
export const requestLogin = params => {
    return request('/api/user/login',params).then(data=>{
        // 设置 token 
        localStorage.setItem('user-token', JSON.stringify(data.token));
        return data
    })
}
//注册用户
export const requestRegister = params => {
    return request('/api/user/register', params)
  }
//用户修改密码验证身份
export const requestVerify = params => {
    return request('/api/user/verify', params)
  }
//用户修改密码提交新密码
export const requestModifyPassword = params => {
    return request('/api/user/modifyPassword', params)
  }
//获取所有用户信息列表
export const requestGetUserLists = params => {
    return requestGET('/api/user/userLists', params)
}
//删除用户
export const requestdeleteUser = params => {
    return request('/api/user/deleteUser', params)
}
//添加题目
export const requestaddQuestion = params => {
    return request('/api/user/addQuestion', params)
}
//获取所有题目列表
export const requestGetQuestionLists = params => {
    return requestGET('/api/user/questionLists', params)
}
//删除题目
export const requestdeleteQuestion = params => {
    return request('/api/user/deleteQuestion', params)
}

//添加试卷
export const requestaddTestpaper = params => {
    return request('/api/user/addTestpaper', params)
}
//获取所有试卷列表
export const requestGetTestpaperLists = params => {
    return requestGET('/api/user/testpaperLists', params)
}
//删除试卷
export const requestdeleteTestpaper = params => {
    return request('/api/user/deleteTestpaper', params)
}

//学生获取考试信息
export const requestExaminationInfo = params => {
    return requestGET('/api/user/getExaminationInfo',params)
}

//添加考试
export const requestaddTest = params => {
    return request('/api/user/addTest', params)
}
//删除考试
export const requestdeleteTest = params => {
    return request('/api/user/deleteTest', params)
}
//根据试卷编号获取试卷
export const requestgetTestpaper = params => {
    return requestGET('/api/user/getTestpaper',params)
}
//根据试卷编号获取试卷所有题目的内容
export const requestgetTestpaperQuestions = params => {
    return requestGET('/api/user/getTestpaperQuestions',params)
}
//交卷
export const requestCommitTest = params => {
    return request('/api/user/commitTest', params)
}
//根据考试编号获取试卷所有学生的成绩
export const requestgetTestStudentGrade = params => {
    return requestGET('/api/user/getGrade',params)
}
//老师提交学生综合题成绩更新成绩
export const requestModifyGrade = params => {
    return request('/api/user/modifyGrade', params)
  }