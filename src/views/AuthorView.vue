<template>
  <div class="author">
    <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
    <router-view />
    <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
  </div>
</template>

<style lang="scss">
  .profilePicture {
    width: 200px;
    border-radius: 20px;
  }

  .author {
    padding-inline: 5vw;
    padding-bottom: 5vh;
    h2 {
      color: #FF0000
    }
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

</style>