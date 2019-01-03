<template>
  <div style="padding:0 5px 0 5px">
    <h3>个人信息</h3>
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
                <el-option label="学生" value="student"></el-option>
                <el-option label="教师" value="teacher"></el-option>
                <el-option label="管理" value="manager"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classname">
            <el-select v-model="ruleForm.classname" placeholder="请选择班级">
                <el-option :label="ruleForm.classname" :value="ruleForm.classname"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码">
          <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder=""
                    id="loginPhone"></el-input>
        </el-form-item>
        
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return{
      ruleForm: {
        account: '201530551301',
        name:'拎着仓鼠',
        sex:'男',
        usertype:'学生',
        phone:'13631428955',
        classname:'计算机科学二班'
      }
    }
  },
  created(){
    //TODO:AJAX获取当前用户信息
  }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>