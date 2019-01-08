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
        deleteManager: 'delete from manager where dno=?',
        verifyStudent: 'select * from student where sno=? and sphone=? and sname=?',
        verifyTeacher: 'select * from teacher where tno=? and tphone=? and tname=?',
        verifyManager: 'select * from manager where dno=? and dphone=? and dname=?',
        modifyPasswordStudent: 'update student set password=? where sno=?',
        modifyPasswordTeacher: 'update teacher set password=? where tno=?',
        modifyPasswordManager: 'update manager set password=? where dno=?'
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
        findTestpaper: 'select * from testpaper where testpaperno=?',
        deleteTestpaper: 'delete from testpaper where testpaperno=?',
        findTestpaperQuestions:'select qno,qtype,qcontent,qanswer,qoption1,qoption2,qoption3,qoption4,qvalue from question,(select * from testpaper where testpaperno=?) as unipaper where question.qno=unipaper.qno1 or question.qno=unipaper.qno2 or question.qno=unipaper.qno3 or question.qno=unipaper.qno4 or question.qno=unipaper.qno5 or question.qno=unipaper.qno6 or question.qno=unipaper.qno7 or question.qno=unipaper.qno8 or question.qno=unipaper.qno9 or question.qno=unipaper.qno10 or question.qno=unipaper.qno11 or question.qno=unipaper.qno12 or question.qno=unipaper.qno13 or question.qno=unipaper.qno14 or question.qno=unipaper.qno15 or question.qno=unipaper.qno16 or question.qno=unipaper.qno17 or question.qno=unipaper.qno18 or question.qno=unipaper.qno19 or question.qno=unipaper.qno20',
        commitTest:'insert into student_test values(?,?,?,?)'
    },
    //考试
    test:{
        addTest:'insert into test_management(testname,testpaperno,start_time_of_test,end_time_of_test) values(?,?,?,?)',
        getExaminationStudent:'select test_management.*, student_test.grade from test_management left join student_test on test_management.testno=student_test.testno and (student_test.sno=? or student_test.sno=null) where test_management.testpaperno = any(select testpaperno from testpaper where tno = (select tno from sc where sno=?))',
        getExaminationTeacher:'select * from test_management where testpaperno = any(select testpaperno from testpaper where tno = ?)',
        deleteTest:'delete from test_management where testno = ?',
        getGrade:`select student.sname,student.sno,student_test.grade 
                    from student left join student_test on student.sno=student_test.sno 
                    and student.classname=? and student_test.testno=? `
    }
}

module.exports = sqlMap;