<template>
  <div class='page'>
    <div class="login-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
               class="demo-ruleForm login-container" status-icon>
        <h3 class="title">系统登录</h3>

        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"
                    id="loginEmail"></el-input>
        </el-form-item>
        
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"
                    id="loginPassword"></el-input>
        </el-form-item>

        <el-form-item  prop="usertype">
            <el-radio-group v-model="ruleForm.usertype">
            <el-radio label="学生"></el-radio>
            <el-radio label="教师"></el-radio>
            <el-radio label="管理"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">
            登录
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button  style="width:100%;" @click.native.prevent="handleRegister">
            注册
          </el-button>
        </el-form-item>

        <el-form-item style="width:100%;">
          <router-link to="/modifyPassword" style="float: right; color: #bbbbbb">忘记密码？</router-link>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import sha256 from 'crypto-js/sha256'
import {requestLogin} from '@/api/user'

export default {
  name: 'app-login',
  data () {
    return {
      logining: false,
      fromUrl: '/index',
      ruleForm: {
        account: '201530551301',
        checkPass: '123456',
        usertype:'教师'
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min:12,max:12,message:'账号应为12位',trigger:'blur'}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        usertype:[
            {required:true,message:'请选择用户类型',trigger:'change'}
        ]
      },
      checked: false  //这个字段是干嘛的？
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true
          const loginParams = {
            sno: this.ruleForm.account,
            password: this.ruleForm.checkPass,  //加密传输：sha256(this.ruleForm.checkPass)
            usertype: this.ruleForm.usertype
          }
          requestLogin(loginParams).then(data => {
              console.log(data)
              var data = data.data;
              if(data.success){
                  this.logining = false
                  // sessionStorage.setItem('username',data.username)
                  this.$message({
                    message: '登录成功！',
                    type: 'success'
                  })
                  var user = JSON.stringify(data.result[0]);
                  window.localStorage.setItem("user",user);
                  //这里根据用户身份跳转至不同的页面
                  this.$router.push(this.fromUrl)
              }else{
                //账号密码错误
                this.logining = false
                this.$message({
                  message: "账号密码错误，或者用户身份不匹配！",
                  type: 'error'
                })
              }
          }).catch(err => {
            this.logining = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister(){
      this.$router.push('/register');
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.fullPath !== '/register' && !from.meta.errorPage) {
        // vm.fromUrl = from.fullPath
      }
    })
  }
}

</script>

<style scoped>

.title {
  text-align: center;
  margin-bottom: 15px;
}

.page {
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #FFF;
  margin: 0;
  padding: 2.25em;
   box-sizing: border-box;
  border: solid 1px #DDD;
  border-radius: .5em;
  font-family: 'Source Sans Pro', sans-serif;
}

</style>