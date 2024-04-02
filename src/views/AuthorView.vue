<template>
  <div class="author">
    <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
    <div class="authorWrapper" :set="author = thisAuthor()">
      <div>
        <h2>{{author.name}}</h2>
        <img :src="author.imageUrl" alt="" class="profilePicture">
      </div>
      <div class="notableWorksWrapper">
        <h3>Notable Works</h3>
        <div class="notableWorks">
          <a class="work" target="_blank" v-for="workId in author.notableWorks" :key="workId" :set="work = getWork(workId)" :href="work.storeUrl">
            <h4>
              {{work.name}}
            </h4>
            <span class="subtitle">Released: {{work.releaseYear}}</span>
            <img class="profilePicture" :src="work.imageUrl" alt="">
            <span class="subtitle">{{work.blurb}}</span>
          </a>
        </div>
      </div>
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
    width: 250px;
    height: 250px;
    border-radius: 20px;
  }

  .authorWrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: space-evenly;
    align-items: center;
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
      height: 150px;

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