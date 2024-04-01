<template>
  <agapic-header></agapic-header>
  <router-view/>
</template>

<script>
import AgapicHeader from './components/AgapicHeader.vue'
export default {
  components: {
    AgapicHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #FF0000;
}
</style>
