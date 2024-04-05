<template>
  <div class="author">
    <div class="loading" v-if="this.loading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div v-if="!this.loading">
      <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
      <div class="authorWrapper" :set="author = this.author">
        <div class="authorProfile">
          <h2>{{author.name}}</h2>
          <img :src="author.image_url" alt="" class="profilePicture">
          <div class="goToAbout" @click="$router.push({name:'article',params:{id:`about-${author.id}`}})">
            About {{author.name}} &raquo;
          </div>
        </div>
        <div class="notableWorksWrapper">
          <h3>Notable Works</h3>
          <div class="notableWorks">
            <a class="work" target="_blank" v-for="work in this.works" :key="work.id" :href="work.access_url">
              <h4>
                {{work.name}}
              </h4>
              <span class="subtitle">Released: {{work.release_year}}</span>
              <img class="profilePicture" :src="work.image_url" alt="">
              <span class="subtitle">{{work.blurb}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { environment } from '@/environment/environment'

export default {
  name: "AuthorView",
  data() {
    return {
      author: {},
      loading: true,
      works: []
    }
  },
  async mounted(){
    this.loading = true
    await this.thisAuthor()
    await this.getWorks(this.author.id)
    this.loading = false
  },
  methods: {
    async thisAuthor() {
      const { data:author } = await environment.supabaseClient
        .from("authors")
        .select("*")
        .filter('id', 'eq', window.location.href.split("/")[window.location.href.split("/").length-1])
      this.author = author[0]
    }, 
    async getWorks (authorId) {
      const { data: works } = await environment.supabaseClient
        .from('works')
        .select('*')
        .filter('author_id', 'eq', authorId)
      this.works = works
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

  .goToAbout {
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      opacity: 80%;
    }
    background-color: #FF0000;
    width: fit-content;
    border-radius: 10px;
    font-weight: 700;
  }

  .authorProfile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

</style>