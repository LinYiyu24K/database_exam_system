<template>
  <el-row class="page">
    <el-col :span="24">
      <the-header :open-nav="openNav" @toggle-open="toggleOpen"></the-header>
    </el-col>
    <!-- <div style="padding:0 20% 0 20%;overflow:hidden"> -->
    <el-col :span="24" class="page-main">
        <the-sidebar :open-nav="openNav"></the-sidebar>
        <section class="page-content">
            <the-main></the-main>
            <the-footer></the-footer>
        </section>
    </el-col>
    <!-- </div> -->
    
  </el-row>
</template>

<script>
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutSidebar from './TheLayoutSidebar'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'

export default {
  name: 'TheLayout',
  data () {
    return {
      openNav: true
    }
  },
  methods: {
    toggleOpen () {
      this.openNav = true
    }
  },
  components: {
    'the-header': TheLayoutHeader,
    'the-sidebar': TheLayoutSidebar,
    'the-footer': TheLayoutFooter,
    'the-main': TheLayoutMain
  }
}
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .page-main {
    display: flex;
    position: absolute;
    top: 60px;
    left:20%;
    overflow: hidden;
    padding-right:20%;
    bottom: 0;
    .page-content {
      position: absolute;
      left: 240px;
      right: 40%;
      height: 100%;
    }
    .page-content-hide-aside {
      left: 65px;
    }
  }
}
</style>