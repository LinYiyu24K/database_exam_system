import {request,requestGET} from '../utils/request'

export const requestLogin = params => {
    return request('/api/user/login',params).then(data=>{
        // 设置 token 
        localStorage.setItem('user-token', JSON.stringify(data.token));
        return data
    })
}

export const requestRegister = params => {
    return request('/api/user/register', params)
  }

export const requestGetUserLists = params => {
    return requestGET('/api/user/userLists', params)
}

export const requestdeleteUser = params => {
    return request('/api/user/deleteUser', params)
}