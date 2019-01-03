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

// 增加用户接口
router.post('/register', (req, res) => {
    var sql = null,
        params = req.body,
        paramsArray = [params.sno, params.password,params.sname, params.ssex,params.usertype, params.sphone,params.classname];
    switch(params.usertype){
        case '学生':{
            sql = $sql.user.addStudent;
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

module.exports = router;