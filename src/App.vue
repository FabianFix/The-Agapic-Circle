<template>
  <agapic-header></agapic-header>
  <router-view class="state"/>
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

body {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

.state {
  padding-top: 20vh;
  padding-inline: 5vw;
}

p {
  text-align: left;
}

nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #FF0000;
}
</style>
