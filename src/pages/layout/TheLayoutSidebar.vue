<template>
  <aside class="sidebar">
    <!-- <vue-scroll> -->
      <el-menu :default-active="$route.path" class="sidebar-menu" :collapse="false"
               @select="menuSelect" :collapse-transition="false">
        <template v-for="(level1, index1) in sideRoutes" v-if="level1.menu">
          <!-- 一级菜单 -->
          <el-menu-item v-if="level1.children.length === 1"
                        :index="level1.children[0].path" :key="index1">  <!-- v-if 后面 && permissions.includes(level1.children[0].path)-->
            <i :class="level1.children[0].icon"></i><span slot="title">{{level1.children[0].name}}</span>
          </el-menu-item>
          <el-submenu :index="index1+''" v-if="level1.children.length > 1" :key="index1+''">
            <template slot="title"><i :class="level1.icon"></i><span slot="title">{{level1.name}}</span></template>
            <template v-for="(level2, index2) in level1.children">
              <!-- 二级菜单 -->
              <el-menu-item v-if="!level2.children"
                            :index="level2.path" :key="index1+'-'+index2"><!-- && permissions.includes(level2.path)-->
                {{level2.name}}
              </el-menu-item>
              <el-submenu :index="index1+'-'+index2" v-if="level2.children" :key="index1+'-'+index2">
                <!-- 三级菜单 -->
                <template slot="title"><i :class="level2.icon"></i>{{level2.name}}</template>
                <el-menu-item v-for="(level3, index3) in level2.children" :index="level3.path"
                              :key="index1+'-'+index2+'-'+index3" > <!--v-if="permissions.includes(level3.path)"-->
                  {{level3.name}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    <!-- </vue-scroll> -->
  </aside>
</template>

<script>
export default {
  name: 'TheLayoutSidebar',
  props: ['openNav'],
  data () {
    var user_name = '';
    const user = JSON.parse(window.localStorage.getItem("user")) || {'usertype':''};
    return {
      usertype: user.usertype
    }
  },
  methods: {
    menuSelect (index) {
      this.$router.push(index)
    }
  },

  computed:{
    sideRoutes(){
      var optionsRoutes = this.$router.options.routes;
      console.log('侧边栏菜单路由是：______')
      console.log(optionsRoutes)
      //侧边栏菜单限制
      //如果是教师，则展示除了用户管理的页面，管理则只展示用户管理和首页，学生或者游客则只展示首页
      if(this.usertype == '教师'){
        return optionsRoutes.filter(item=>{
          return item.name != '用户管理'
        })
      }else if(this.usertype == '管理'){
        return optionsRoutes.filter(item=>{
          return item.name == '用户管理' || item.name == '首页'
        })
      }else{
        return optionsRoutes.filter(item=>{
          return item.name == '首页' || item.name == '学生管理'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  position: absolute;
  top: 0;
  bottom: 0;
  border-right: 1px solid #e6e6e6;
  .sidebar-menu {
    border: none;
    height: 100%;
  }
}
.sidebar-hide {
  width: 240px;
}
</style>