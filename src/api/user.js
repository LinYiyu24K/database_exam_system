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
//获取所有用户信息列表
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

//添加考试
export const requestaddTest = params => {
    return request('/api/user/addTest', params)
}