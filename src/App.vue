<template>
  <div id="app">
    hello
    <hr>
    <router-link to='/home'>首页</router-link>
    <hr>

    <router-link to='/about'>关于</router-link>
    <hr>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  mounted() {
    console.log(this.$router,this.$route)
  },
}
</script>
