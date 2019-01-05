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
var check = function(num){
    if(0<=num && num<10){
        return '0'+num;
    }else{
        return num;
    }
}
var formatDatetime = function(timestamp){
    var date = new Date(timestamp),
        year = date.getFullYear(),
        month = check(date.getMonth()+1),
        day = check(date.getDate()),
        hour = check(date.getHours()),
        minute = check(date.getMinutes()),
        seconds = check(date.getSeconds());
    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;

}
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
//录入题目接口
router.post('/addQuestion', (req, res) => {
    var sql = null,
        params = req.body,
        paramsArray = [params.qtype, params.title,params.answer, params.optionA,params.optionB, params.optionC,params.optionD,params.qvalue];
    switch(params.qtype){
        case '单选':
        case '多选':{
            sql = $sql.question.addChoices;
            break;
        }
        case '判断':
        case '综合':{
            sql = $sql.question.addJudge;
            paramsArray = [params.qtype, params.title,params.answer, params.qvalue];
            break;
        }
        default:
        break;
    }
    console.log("_______收到的题目信息__________");
    console.log(params);
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            if(err.errno==1062){
                jsonWrite(res,undefined);
            }
        }
        if (result) {
            console.log("_______-增加题目成功____________")
            jsonWrite(res, result);
        }
    })
});

//学生获取考试信息
router.get('/getExaminationInfo', (req, res) => {
    var sql = null,
        paramsArray = [],
        params = req.query;//得到 url？后面的参数，params为对象的形式;
    if(params.sno){
        sql = $sql.test.getExaminationStudent;
        paramsArray.push(params.sno);
    }else{
        sql = $sql.test.getExaminationTeacher;
        paramsArray.push(params.tno);
    }
    console.log("______获取考试信息_________")
    console.log(sql)
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
                // var ret = [];
                // result.forEach(item => {
                //     ret.concat(item);
                // })
                // console.log(ret)
                // console.log(result[0])
                // console.log(result[1])
                jsonWrite(res, result);
            }
        }
    })
});
// 获取所有题目接口,题目是所有教师的共有的
router.get('/questionLists', (req, res) => {
    var sql = $sql.question.findAllQuestions;
    
    console.log("_______查询所有题目信息__________");
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err);
                jsonWrite(res,undefined);
        }
        if (result) {
            console.log("_______-获取所有题目成功____________")
            jsonWrite(res, result);
        }
    })
});
//删除题目接口
router.post('/deleteQuestion', (req, res) => {
    var sql = $sql.question.deleteQuestion,
        params = req.body,
        paramsArray = [params.qno];
        console.log("______删除的题目对象：________");
        console.log(params);
        //根据题号 params.qno 删除题目
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,undefined);
        }
        if (result) {
            console.log("删除题目成功>>>>>>>>>")
            console.log(result);
            jsonWrite(res, result);
        }
    })
});

// 组卷接口
router.post('/addTestpaper', (req, res) => {
    var sql = $sql.testpaper.addTestpaper,
        params = req.body,
        qnos=[],
        questionArray = JSON.parse(params.questionArray);
        questionArray.forEach(item=>{
            qnos.push(item.qno);
        })
    var paramsArray = [params.testpapername, params.tno].concat(qnos);
    console.log("_______收到的组卷题目编号__________");
    console.log(qnos);
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
                jsonWrite(res,undefined);
        }
        if (result) {
            console.log("_______-增加题目成功____________")
            jsonWrite(res, result);
        }
    })
});
// 获取所有试卷接口
router.get('/testpaperLists', (req, res) => {
    var sql = $sql.testpaper.findAllTestpapers,
        params = req.query,
        paramsArray = [params.tno];
    
    console.log("_______查询所有题目信息__________");
    conn.query(sql, paramsArray,function(err, result) {
        if (err) {
            console.log(err);
                jsonWrite(res,undefined);
        }
        if (result) {
            console.log("_______-获取所有试卷成功____________")
            jsonWrite(res, result);
        }
    })
});
//删除试卷接口
router.post('/deleteTestpaper', (req, res) => {
    var sql = $sql.testpaper.deleteTestpaper,
        params = req.body,
        paramsArray = [params.testpaperno];
        console.log("______删除的试卷对象：________");
        console.log(params);
        //根据题号 params.qno 删除题目
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,undefined);
        }
        if (result) {
            console.log("删除题目成功>>>>>>>>>")
            console.log(result);
            jsonWrite(res, result);
        }
    })
});
// 发布考试接口
router.post('/addTest', (req, res) => {
    var sql = $sql.test.addTest,
        params = req.body,
        start_time = formatDatetime(params.start_time_of_test),
        end_time = formatDatetime(params.end_time_of_test),
        paramsArray = [params.testname, params.testpaperno,start_time, end_time];
    console.log("_______收到的考试安排__________");
    console.log(params);
    conn.query(sql, paramsArray, function(err, result) {
        if (err) {
            console.log(err);
                jsonWrite(res,undefined);
        }
        if (result) {
            console.log("_______-增加考试成功____________")
            jsonWrite(res, result);
        }
    })
});

module.exports = router;