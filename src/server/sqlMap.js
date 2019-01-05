// sql语句
var sqlMap = {
    // 用户
    user: {
        addStudent: 'insert into student(sno, password,sname, ssex,usertype,sphone,classname) values (?,?,?,?,?,?,?)',
        addTeacher: 'insert into teacher(tno, password,tname, tsex,usertype,tphone,classname) values (?,?,?,?,?,?,?)',
        addManager: 'insert into manager(dno, password,dname, dsex,usertype,dphone) values (?,?,?,?,?,?)',
        findStudent: 'select * from student where sno=? and password=?',
        findTeacher: 'select * from teacher where tno=? and password=?',
        findManager: 'select * from manager where dno=? and password=?',
        findAllStudent: 'select * from student',
        findAllTeacher: 'select * from teacher',
        findAllManager: 'select * from manager',
        deleteStudent: 'delete from student where sno=?',
        deleteTeacher: 'delete from teacher where tno=?',
        deleteManager: 'delete from manager where dno=?'
    },
    //题目
    question:{
        addChoices:'insert into question(qtype,qcontent,qanswer,qoption1,qoption2,qoption3,qoption4,qvalue) values(?,?,?,?,?,?,?,?)',
        addJudge:'insert into question(qtype,qcontent,qanswer,qvalue) values(?,?,?,?)',
        findAllQuestions: 'select * from question',
        deleteQuestion: 'delete from question where qno=?'
    },
    //试卷
    testpaper:{
        addTestpaper:'insert into testpaper(testpapername,tno,qno1,qno2,qno3,qno4,qno5,qno6,qno7,qno8,qno9,qno10,qno11,qno12,qno13,qno14,qno15,qno16,qno17,qno18,qno19,qno20) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        findAllTestpapers: 'select * from testpaper where tno=?',
        deleteTestpaper: 'delete from testpaper where testpaperno=?'
    },
    //考试
    test:{
        addTest:'insert into test_management(testname,testpaperno,start_time_of_test,end_time_of_test) values(?,?,?,?)',
        getExaminationStudent:'select * from test_management where testpaperno = any(select testpaperno from testpaper where tno = (select tno from sc where sno=?))',
        getExaminationTeacher:'select * from test_management where testpaperno = any(select testpaperno from testpaper where tno = ?)',
    }
}

module.exports = sqlMap;