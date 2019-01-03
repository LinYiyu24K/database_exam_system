import Mock from 'mockjs'

export default  {
    mockData(){
        Mock.mock('/api/user/login',{
            'success': true,
            'result': {
                'success':true,
                'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj',
                'username':'拎着仓鼠' //TODO：返回用户名
            }
        })
        Mock.mock('/api/user/register',{
            'success':true,
            'result':{}
        })
        
    }
}