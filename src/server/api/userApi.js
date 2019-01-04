var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect(function(err) {
    if (err) {
        console.log('mysql connection is exit error...')
      return false;
    }
    console.log('mysql connection already...')
  });


var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            success: false,
            result : {
                message : "操作失败"
            }
        });
    } else {
        var data ={
            "success": true,         //请求成功或失败
            "result": ret               //请求成功后的结果
        }
        res.json(data);
    }
};

// 注册用户接口
router.post('/register', (req, res) => {
    var sql = null,
        params = req.body,
        // sql2 = ';insert into sc(sno,tno,classname) select student.sno,teacher.tno,teacher.classname from student,teacher where student.classname = teacher.classname and student.sno='+params.sno,
        paramsArray = [params.sno, params.password,params.sname, params.ssex,params.usertype, params.sphone,params.classname];
    switch(params.usertype){
        case '学生':{
            sql = $sql.user.addStudent/*+sql2*/;
            break;
        }
        case '教师':{
            sql = $sql.user.addTeacher;
            break;
        }
        case '管理':{
            sql = $sql.user.addManager;
            paramsArray = [params.sno, params.password,params.sname, params.ssex,params.usertype, params.sphone];
            break;
        }
        default:
        break;
    }
    console.log(params);//sno, password,sname, ssex,usertype,sphone,classname
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            if(err.errno==1062){
                jsonWrite(res,undefined);
            }
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//用户登陆接口
router.post('/login', (req, res) => {
    var sql = null,
        params = req.body,
        paramsArray = [params.sno, params.password];
    switch(params.usertype){
        case '学生':{
            sql = $sql.user.findStudent;
            break;
        }
        case '教师':{
            sql = $sql.user.findTeacher;
            break;
        }
        case '管理':{
            sql = $sql.user.findManager;
            break;
        }
        default:
        break;
    }
    console.log(params);//sno, password, usertype
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,undefined);
        }
        if (result) {
            console.log(result);
            if(result.length == 0){
                jsonWrite(res,undefined);
            }else{
                jsonWrite(res, result);
            }
        }
    })
});


//用户列表接口
router.get('/userLists', (req, res) => {
    var sql1 = $sql.user.findAllStudent,
        sql2 = $sql.user.findAllTeacher,
        sql3 = $sql.user.findAllManager,
        sql = sql1+";"+sql2+";"+sql3,
        params = req.query;//得到 url？后面的参数，params为对象的形式;
    console.log("__________")
    //console.log(params);//sno, password, usertype
    console.log("__________")
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,undefined);
        }
        if (result) {
            console.log(result);
            if(result.length == 0){
                jsonWrite(res,undefined);
            }else{
                var ret = []
                result.forEach(item=>{
                    ret = ret.concat(item)
                })
                console.log("???????")
                console.log(ret)
                ret.forEach((item,index,array)=>{
                    item.account = item.sno || item.tno || item.dno;
                    item.name = item.sname || item.tname || item.dname;
                    item.sex = item.ssex || item.tsex || item.dsex;
                    item.phone = item.sphone || item.tphone || item.dphone;
                })
                console.log("???????")
                // console.log(ret)
                jsonWrite(res, ret);
            }
        }
    })
});
//删除用户接口
router.post('/deleteUser', (req, res) => {
    var sql = null,
        params = req.body,
        paramsArray = [params.account];
    switch(params.usertype){
        case '学生':{
            sql = $sql.user.deleteStudent;
            break;
        }
        case '教师':{
            sql = $sql.user.deleteTeacher;
            break;
        }
        case '管理':{
            sql = $sql.user.deleteManager;
            break;
        }
        default:
        break;
    }
    console.log(params);//sno, password, usertype
    console.log(sql)
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,undefined);
        }
        if (result) {
            console.log(">>>>>>>>>")
            console.log(result);
            jsonWrite(res, result);
        }
    })
});

module.exports = router;