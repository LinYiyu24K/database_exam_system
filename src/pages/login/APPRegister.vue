<template>
  <div class='page'>
    <div class="login-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="80px"
               class="demo-ruleForm login-container" status-icon>
        <h3 class="title">添加用户</h3>
        <el-form-item prop="account" label="账号">
          <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder=""
                    id="loginEmail"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder=""
                    id="loginPassword"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="重复密码">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder=""
                    id="loginCheckPass"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder=""
                    id="loginName"></el-input>
        </el-form-item>
        <el-form-item  prop="sex" label="性别">
            <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" prop="usertype">
            <el-select v-model="ruleForm.usertype" placeholder="请选择用户类型">
                <el-option label="学生" value="学生"></el-option>
                <el-option label="教师" value="教师"></el-option>
                <el-option label="管理" value="管理"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
            <el-select v-model="ruleForm.classname" placeholder="请选择班级">
                <el-option 
                v-for="(classname,index) in classnames"   
                :label="classname" 
                :value="classname"
                :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder=""
                    id="loginPhone"></el-input>
        </el-form-item>
        
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:80%;" @click.native.prevent="handleSubmit" :loading="logining">
            添加
          </el-button>
          <!-- <router-link to="/login">
            <el-button style="width:40%;margin-left:10%">
              登录
            </el-button>
          </router-link> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {requestRegister} from '@/api/user'

export default {
  name: 'app-login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else if(value.length<3){
        callback(new Error("密码不得少于3位"))
      }else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      classnames:['计算机科学一班','计算机科学二班','网络工程'
      ],
      ruleForm: {
        account: '',
        password: '',
        checkPass: '',
        name:'',
        sex:'',
        usertype:'',
        phone:'',
        classname:''
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min:12,max:12,message:'账号应为12位',trigger:'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'},
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger:'blur'},
          {required: true, message: '请再次输入密码', trigger: 'blur'}
        ],
        name:[
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        sex:[
            {required:true,message:'请选择性别',trigger:'change'}
        ],
        usertype:[
            {required:true,message:'请选择用户类型',trigger:'change'}
        ],
        phone:[
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min:11,max:11,message:'手机号码应为11位',trigger:'blur'}
        ],
        classname:[
          {required:true,message:'请选择班级',trigger:'change'}
        ]
      }
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.ruleForm.validate((valid) => {
          //如果验证通过
        if (valid) {
          this.logining = true
          var registerParams = {
            sno: this.ruleForm.account,
            password: this.ruleForm.password,
            sname: this.ruleForm.name,
            usertype: this.ruleForm.usertype,
            ssex: this.ruleForm.sex,
            sphone:this.ruleForm.phone,
            classname:this.ruleForm.classname
          }
          requestRegister(registerParams).then(data => {
            console.log(data)
            var data = data.data;
            if(!data.success){
              this.logining = false
              this.$message({
                message: "用户名重复！",
                type: 'error'
              })
            }else{
              this.logining = false
              this.$message({
                message: '添加成功！',
                type: 'success'
              })
            }
            // this.$router.push({path: '/login'})
            console.log(registerParams)
          }).catch(err => {
            this.logining = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created(){
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