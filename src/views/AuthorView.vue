<template>
  <div class="author">
    <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
    <h2>{{thisAuthor().name}}</h2>
    <img :src="thisAuthor().imageUrl" alt="" class="profilePicture">
    <h3>Notable Works</h3>
    <div class="notableWorks">
      <a class="work" target="_blank" :href="getWork(workId).storeUrl" v-for="workId in thisAuthor().notableWorks" :key="workId">
        <h4>
          {{getWork(workId).name}}
        </h4>
        <span class="subtitle">Released: {{getWork(workId).releaseYear}}</span>
        <img class="profilePicture" :src="getWork(workId).imageUrl" alt="">
        <span class="subtitle">{{getWork(workId).blurb}}</span>
      </a>
    </div>
    <router-view />
    <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
  </div>
</template>
<script>
import AUTHORS from '../statics/authors.json'
import WORKS from '../statics/works.json'

export default {
  name: "AuthorPage",
  methods: {
    thisAuthor() {
      return AUTHORS.filter(author => {
        if(author.id == window.location.href.split("/")[window.location.href.split("/").length-1]){
          return true
        }
      })[0]
    }, 
    getWork: function (workId) {
      return WORKS.filter(work => work.id == workId)[0]
    }
  }
}
</script>
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

  .work {
    border: solid;
    border-width: 1px;
    border-color: #000000;
    border-radius: 25px;
    padding-inline: 25px;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    h4 {
      color: #FF0000;
    }
    &:hover {
      h4 {
        text-decoration: underline;
      }
      img {
        opacity: 80%;
      }
    }
    width: 150px;
    margin-bottom: 0;
    cursor: pointer;
    .subtitle {
      color: grey;
      font-size: 0.8rem;
      float: right;
      font-weight: normal;
    }
    img {
      width: 150px;
      border-radius: 25px;
      z-index: -10;
    }
    padding-bottom: 10px;

    height: fit-content;
  }

  .notableWorks {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: center;
  }

</style>