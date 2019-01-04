<template>
  <main :style="mainStyle" class="page-sub-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'TheLayoutMain',
  data () {
    const win_height = window.innerHeight - 100 + 'px'
    return {
      mainStyle: {
        minHeight: win_height
      }
    }
  }
}
</script>

<style scoped>
.page-sub-main {
    padding-top:10px;
  // background-color: #EBEEF5;
  color: #666666;
}
</style>