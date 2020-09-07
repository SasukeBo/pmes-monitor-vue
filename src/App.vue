<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue'
import GraphQLError from './utils/graphql_error'
Vue.prototype.$GraphQLError = GraphQLError
export default {
  name: 'App'
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
}

#app {
  overflow: hidden;
}

* {
  box-sizing: border-box;
}
</style>
