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
            msg: '操作失败'
        });
    } else {
        var data ={
            "success": true,         //请求成功或失败
            "result": ret,                  //请求成功后的结果
            "error":{
                "code": 100001,              //请求失败错误码
                "message": "用户名字重复"     //请求失败描述
            }
        }
        res.json(data);
    }
};

// 增加用户接口
router.post('/register', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);//sno, password,sname, ssex,usertype,sphone,classname
    conn.query(sql, [params.sno, params.password,params.sname, params.ssex,params.usertype, params.sphone,params.classname], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

module.exports = router;