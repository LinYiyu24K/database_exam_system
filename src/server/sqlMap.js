// sql语句
var sqlMap = {
    // 用户
    user: {
        addStudent: 'insert into student(sno, password,sname, ssex,usertype,sphone,classname) values (?,?,?,?,?,?,?)',
        addTeacher: 'insert into teacher(tno, password,tname, tsex,usertype,tphone,classname) values (?,?,?,?,?,?,?)',
        addManager: 'insert into manager(dno, password,dname, dsex,usertype,dphone) values (?,?,?,?,?,?)',
        findStudent: 'select * from student where sno=? and password=?',
        findTeacher: 'select * from teacher where sno=? and password=?',
        findManager: 'select * from manager where sno=? and password=?'
    }
}

module.exports = sqlMap;