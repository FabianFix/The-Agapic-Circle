<template>
  <div class="header">
    <h1>The <span style="color: #FF0000;">Agapic</span> Circle</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="searchAuthorParent">
      <input class="searchAuthor" placeholder="Search for a thinker" id=searchAuthor>
      <router-link :to="``">
        <img src="https://res.cloudinary.com/dzc0tlbqw/image/upload/v1711999509/ox7va20ary2dt12zudkz.png" alt="" class="magnifyingGlass">
      </router-link>
    </div>
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
    margin-top: -8px;
    background-color: #FFFFFF;
  }

  .searchAuthor {
    width: 70vw;
    height: 4vh;
    border-width: 0;
    border-radius: 2vh;
    padding-inline: 1rem;
    background-color: #EEEEEE;
  }

  .magnifyingGlass {
    height: 3vh;
  }

  h1 {
    height: 5vh;
  }

  .searchAuthorParent {
    width: 80vw;
    display: flex;
    gap: 2vw;
    align-items: center;
    justify-content: center;
  }

  nav{
    display: flex;
    gap: 5vw;
    justify-content: center;
  }
</style>