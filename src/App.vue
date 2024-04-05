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

<style lang="scss">

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

.back {
    &:hover {
      opacity: 50%;
      cursor: pointer;
      text-decoration: underline;
    }
    text-align: left;
    width: fit-content;
  }

.next {
    &:hover {
      opacity: 50%;
      cursor: pointer;
      text-decoration: underline;
    }
    text-align: right;
    width: fit-content;
  }


nav a {
  font-weight: bold;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #FF0000;
}

.loading {
    width: 90vw;
    height: 80vh;
    margin-top: -20vh;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 150px;
    }
}

.bold {
  font-weight: 700;
}

.red {
  color: #FF0000;
}

.underline {
  text-decoration: underline;
}
</style>
