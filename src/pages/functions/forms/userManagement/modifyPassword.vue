<template>
  <div class='page'>
    <div class="login-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="80px"
               class="demo-ruleForm login-container" status-icon>
        <h3 class="title">修改密码</h3>
        <el-form-item prop="account" label="请输入您申请更改密码的账号"  v-show="!hasVerified">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder=""
                    id="loginEmail"></el-input>
        </el-form-item>
        <el-form-item label="请选择您申请更改密码的账号类型" prop="usertype" v-show="!hasVerified">
            <el-select v-model="ruleForm.usertype" placeholder="请选择用户类型">
                <el-option label="学生" value="学生"></el-option>
                <el-option label="教师" value="教师"></el-option>
                <el-option label="管理" value="管理"></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item prop="name" label="请输入您申请更改密码账号的姓名" v-show="!hasVerified">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder=""
                    id="loginName"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="请输入您申请更改密码账号的手机号码" v-show="!hasVerified">
          <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder=""
                    id="loginPhone"></el-input>
        </el-form-item>
        
        

        <el-form-item prop="password" label="请输入新密码" v-show="hasVerified">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder=""
                    id="loginPassword"></el-input>
        </el-form-item>
        
        <el-form-item style="width:100%;" v-show="!hasVerified">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleVerify" :loading="verifing">
            验证
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;" v-show="hasVerified">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">
            提交申请
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button style="width:100%;" @click.native.prevent="handleBack">
            返回登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {requestVerify,requestModifyPassword} from '@/api/user'

export default {
  name: 'modifyPassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else if(value.length<3){
        callback(new Error("密码不得少于3位"))
      }else {
        
        callback()
      }
    }
    return {
      logining: false,
      verifing:false,
      hasVerified:false,
      classnames:['计科一班','计科二班','网络工程','信息安全'
      ],
      ruleForm: {
        account: '',
        password: '',
        name:'',
        usertype:'',
        phone:''
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min:12,max:12,message:'账号应为12位',trigger:'blur'}
        ],
        // password: [
        //   {validator: validatePass, trigger: 'blur'},
        //   {required: true, message: '请输入密码', trigger: 'blur'}
        // ],
        name:[
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        usertype:[
            {required:true,message:'请选择用户类型',trigger:'change'}
        ],
        phone:[
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min:11,max:11,message:'手机号码应为11位',trigger:'blur'}
        ]
      }
    }
  },
  computed:{
    
  },
  methods: {
    handleSubmit (ev) {
      var valid = false;
      if(this.ruleForm.password == ''){
        this.$message({
          type:"error",
          message:"密码不能为空！"
        })
        return false;
      }else if(this.ruleForm.password.length<3){
        this.$message({
          type:'error',
          message:'密码长度不能少于三位！'
        })
        return false;
      }else{
        //如果验证通过
          this.logining = true
          var modifyPasswordParams = {
            sno: this.ruleForm.account,
            password: this.ruleForm.password,
            usertype: this.ruleForm.usertype
          }
          requestModifyPassword(modifyPasswordParams).then(data => {
            console.log(data)
            var data = data.data;
            if(!data.success){
              this.logining = false
              this.$message({
                message: "修改密码失败！",
                type: 'error'
              })
            }else{
              this.logining = false;
              this.$message({
                message: '新密码修改成功！',
                type: 'success'
              })
              this.$router.push('/login')
            }
            // this.$router.push({path: '/login'})
            console.log(modifyPasswordParams)
          }).catch(err => {
            this.logining = false
            console.log(err)
          })
      }
        
    },
    handleVerify (ev) {
      this.$refs.ruleForm.validate((valid) => {
          //如果验证通过
        if (valid) {
          this.verifing = true
          var verifyParams = {
            sno: this.ruleForm.account,
            sname: this.ruleForm.name,
            usertype: this.ruleForm.usertype,
            sphone:this.ruleForm.phone
          }
          requestVerify(verifyParams).then(data => {
            console.log(data)
            var data = data.data;
            this.verifing = false;
            if(!data.success){
              this.logining = false
              this.$message({
                message: "身份验证失败！",
                type: 'error'
              })
            }else{
              this.hasVerified = true;
              this.$message({
                message: '身份验证成功！',
                type: 'success'
              })
            }
            // this.$router.push({path: '/login'})
            console.log("____身份验证成功_____-")
            console.log(verifyParams)
          }).catch(err => {
            this.verifing = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleBack(){
      this.$router.push('/login');
    }
  },
  created(){
    console.log(window.location.href)
    //判断用户已经登陆进入系统，从忘记密码按钮进入，如果是，则自动填充用户账号
    var href = window.location.href;
    if(href.indexOf('?') !== -1){
      var isFromInner = window.location.href.split("?")[1].split("=")[1];
      if(isFromInner == '1'){
        console.log('11111111111')
        var user = JSON.parse(window.localStorage['user']),
            account = user.sno != undefined?user.sno:(user.tno != undefined?user.tno:user.dno);
            console.log(account)
        this.ruleForm.account = account;
      }
    }
    
    //TODO,AJAX获取班级列表,初始化this.classnames数组
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
  top: 40%;
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

.login-box .svgContainer {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 1em;
  border-radius: 50%;
  pointer-events: none;
}

</style>