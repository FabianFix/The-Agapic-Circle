<template>
  <div class="header">
    <h1>The <span style="color: #FF0000;">Agapic</span> Circle</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AgapicHeader'
}

</script>

<style>
  .header{
    display: flex;
    flex-direction: column;
    gap: 1vh;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    background-color: #FFFFFF;
    padding-bottom: 5vh;
  }

  h1 {
    height: 5vh;
  }

  nav{
    display: flex;
    gap: 5vw;
    justify-content: center;
  }
</style>