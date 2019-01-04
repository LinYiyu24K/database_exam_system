<template>
  <header class="header">
    <router-link to="/index">
      <div class="logo" :class="{'logo-hide': !openNav}">
        <img src="../../assets/logo.png" class="image"/>
        <span class="text">LLPlatform</span>
      </div>
    </router-link>
    
    <div class="content">
      
    </div>
    <el-dropdown trigger="hover" class="user">
      <span class="user-info">
        {{ user_name }}<i class="fa fa-user-circle-o fa-2x" style="margin-left: 10px"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的账号</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided>主题设置</el-dropdown-item>
        <el-dropdown-item>语言选择</el-dropdown-item>
        <el-dropdown-item divided>
          <router-link to="/login">退出登录</router-link>
        </el-dropdown-item>
      </el-dropdown-menu>
      <i class="el-icon-arrow-down fa fa-align-justify toggle" style="color:white" @click="navOpenToggle" title="显示/隐藏菜单"></i>
    </el-dropdown>
  </header>
</template>

<script>
export default {
  name: 'TheLayoutHeader',
  props: ['openNav'],
  data () {
    // const user_info = JSON.parse(sessionStorage.getItem('user-info'))
    var user_name;
    const user = JSON.parse(window.localStorage.getItem("user"));
    switch(user.usertype){
      case '学生': {
        user_name = user.sname;
        break;
      }
      case '教师': {
        user_name = user.sname;
        break;
      }
      case '管理': {
        user_name = user.dname;
        break;
      }
      default:
        user_name = '小仓鼠游客';
    }
    return {
      user_name: user_name
    }
  },
  methods: {
    navOpenToggle () {
      this.$emit('toggle-open')
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  padding:0 20% 0 20%;
  line-height: 60px;
  height:60px;
  background-color: #409EFF;
  color: #ffffff;
  div {
    display: inline-block;
  }
  .logo {
    width: 240px;
    // border-right: 1px solid #C0C4CC;
    margin-left: -20px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    .image {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
  }
  .logo-hide {
    width: 65px;
    .text {
      display: none;
    }
  }
  .content {
    padding: 0 20px;
    .toggle {
      font-size: 14px;
      cursor: pointer;
    }
  }
  .user {
    float: right;
    cursor: pointer;
    .user-info {
        font-size:18px;
      color: #ffffff;
      i {
        vertical-align: middle;
      }
    }
  }
}
</style>