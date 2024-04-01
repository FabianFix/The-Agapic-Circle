<template>
  <div class="author">
    <router-link to="/" class="back" >&laquo; Back</router-link>
    <router-view />
    <router-link to="/" class="back" >&laquo; Back</router-link>
  </div>
</template>

<style>
  .profilePicture {
    width: 200px;
    border-radius: 20px;
  }

  .author {
    padding-inline: 5vw;
    padding-bottom: 5vh;
  }

  h2 {
    color: #FF0000
  }
</style>