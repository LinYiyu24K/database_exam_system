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
    1、单选题录入 ：6道，一道3分
    2、单选题管理
    1、判断题录入 ：6道，一道2分
    2、判断题管理
    5、多选题录入 ：5道，一道5分，全对5分
    6、多选题管理
    7、综合题录入 
    8、综合题管理 ：3道，一道15分
    考试管理 ： 
    1、发布考试 ： 在试卷表根据 tno 获取所有试卷号，在试卷末尾有发布考试按钮，填写考试开始时间，发布考试之后系统怎么在规定时间进行考试？？
    2、考试成绩 ： 在试卷表根据 tno 获取所有试卷号，联合考试管理表得到该 teacher 的所有考试，根据考试号从 学生考试表获取所有学生的信息以及考试成绩
三、学生
    1、点击选择考试进行考试：根据 老师学生 表获取老师，在试卷表根据 tno 获取所有试卷号，联合考试管理表得到该 teacher 的所有考试
        考完试获得成绩

系统使用：
环境：node

1、安装依赖。进到 /database_exam_system 根目录下， 执行 
npm install 
2、依赖缺失。若报错 can't not find mudule 'mysql' 或者其他错误，则执行
npm install mysql
npm install express
3、启动数据库。管理员启动cmd，执行
net start mysql
4、启动项目。启动终端到 /database_exam_system 下，执行
npm start
5、启动服务器。另开一个终端到 /database_exam_system/src/server/下，执行
node index.js
6、启动成功
7、在浏览器输入 http://localhost:8080/#/login即可登陆

管理员、学生、教师初始账号均为 201530551301 ，密码123456
推出为右上角的，鼠标移动到用户名上（不需点击），即会弹出 退出登陆按钮，如果无效，多退出几次

## 注意事项：
## 1、数据库配置，/database_exam_system/src/server/db.js ，此文件可配置个人配置
## 2、若 npm install 总是 error ，则删除掉根目录下 node_modules 整个文件夹，重新安装依赖，即
## npm  install
## 若导入 .sql文件，注意数据库名为 exam_system