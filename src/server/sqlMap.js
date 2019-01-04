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
    }
}

module.exports = sqlMap;