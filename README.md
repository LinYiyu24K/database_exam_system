# exam

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#  Function introduce

一、管理员
    用户管理 ： 
    1、个人信息 ：管理员的个人信息
    2、用户列表 ： 所有用户的列表
    3、添加用户 ：在这里注册管理员、老师和学生用户

二、教师
    学生管理 ： 
    1、学生信息
    试卷管理 ：
    1、试卷制定 ： 在这里导入试题，生成试卷，10道单选，10道判断，10道双选
    2、试卷维护 ： 在这里修改试卷
    试题管理 ：
    1、单选题录入 ：一道3分
    2、单选题管理
    1、判断题录入 ：一道2分
    2、判断题管理
    5、多选题录入 ：一道5分
    6、多选题管理
#   7、综合题录入 
#   8、综合题管理
    考试管理 ： 
    1、发布考试 ： 在试卷表根据 tno 获取所有试卷号，在试卷末尾有发布考试按钮，填写考试开始时间，发布考试之后系统怎么在规定时间进行考试？？
    2、考试成绩 ： 在试卷表根据 tno 获取所有试卷号，联合考试管理表得到该 teacher 的所有考试，根据考试号从 学生考试表获取所有学生的信息以及考试成绩
三、学生
    1、点击选择考试进行考试：根据 老师学生 表获取老师，在试卷表根据 tno 获取所有试卷号，联合考试管理表得到该 teacher 的所有考试
        考完试获得成绩
