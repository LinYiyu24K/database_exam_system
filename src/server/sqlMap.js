// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into student(sno, password,sname, ssex,usertype,sphone,classname) values (?, ?, ?,?,?,?,?)'
    }
}

module.exports = sqlMap;