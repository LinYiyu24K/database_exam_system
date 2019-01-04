<template>
  <div class='page'>
    <div class="info-box">
    <h3 class="title">个人信息</h3>
    <el-form :model="ruleForm"  ref="ruleForm" label-position="left" label-width="80px"
               class="demo-ruleForm login-container" status-icon>
        <el-form-item prop="account" label="账号">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder=""
                    id="loginEmail"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder=""
                    id="loginName"></el-input>
        </el-form-item>
        <el-form-item  prop="sex" label="性别" >
            <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" prop="usertype">
            <el-select v-model="ruleForm.usertype" placeholder="请选择用户类型">
                <el-option :label="ruleForm.usertype" :value="ruleForm.usertype"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
            <el-select v-model="ruleForm.classname" placeholder="无班级" :disabled="ruleForm.usertype == '管理'">
                <el-option :label="ruleForm.classname" :value="ruleForm.classname"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder=""
                    id="loginPhone"></el-input>
        </el-form-item>
        
      </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return{
      ruleForm: {
        account: '',
        name:'',
        sex:'',
        usertype:'',
        phone:'',
        classname:''
      }
    }
  },
  created() {
    //TODO:AJAX获取当前用户信息
    var user = JSON.parse(window.localStorage.user) || {};
    console.log(user);
    this.ruleForm.usertype = user.usertype;
    this.ruleForm.classname = user.classname;
    switch(user.usertype){
      case '学生': {
        this.ruleForm.account = user.sno;
        this.ruleForm.name = user.sname;
        this.ruleForm.sex = user.ssex;
        this.ruleForm.phone = user.sphone;
        break;
      }
      case '教师': {
        this.ruleForm.account = user.tno;
        this.ruleForm.name = user.tname;
        this.ruleForm.sex = user.tsex;
        this.ruleForm.phone = user.tphone;
        break;
      }
      case '管理': {
        this.ruleForm.account = user.dno;
        this.ruleForm.name = user.dname;
        this.ruleForm.sex = user.dsex;
        this.ruleForm.phone = user.dphone;
        break;
      }
      default:
        break;
    }
  }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
.title {
  text-align: center;
  margin-bottom: 15px;
}
.page{
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.info-box{
    position: absolute;
  top: 29.5%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 500px;
  background-color: #FFF;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #DDD;
  border-radius: .5em;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>