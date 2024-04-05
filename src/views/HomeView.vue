<template>
  <div class="home">
    <div class="loading" v-if="this.loading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="whiteBackground" v-if="!this.loading">
      <div class="searchAuthorParent">
        <input v-model="searchQuery" class="searchAuthor" placeholder="Search for a thinker" id=searchAuthor>
      </div>
    </div>
    <div class="timePeriods" v-if="!this.loading">
      <div v-for="item in populatedContextsWithAuthors" :key="item.context.chronology" class="group">
        <h2 class="center">{{item.context.name}}</h2>
        <div class="section">
          <div v-for="author in item.authors" :key="author.id">
            <div class="author" @click="$router.push({path: 'author/' + author.id})">
              <div class="centered"><h3>{{author.name}}</h3></div>
              <img v-bind:src="author.image_url">
              <span class="subtitle">{{getDateOfBirth(author)}} - {{getDateOfDeath(author)}}</span>
                <div class="tags">
                  <div class="subtitle tag" v-for="tag in author.tags" :key="tag">
                    <span>{{tag}}</span>
                  </div>
                </div>
              <span class="subtitle summary"><i>{{author.summary}}</i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { environment } from '@/environment/environment.js'

export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: "",
      populatedContextsWithAuthors: [],
      loading: true,
      contexts: []
    }
  },
  async mounted() {
    this.loading = true
    await this.getAllContexts()
    await this.updatePopulatedContextsWithAuthors();
    this.loading = false
  },
  methods: {
    getDateOfBirth: function (author) {
      return author.born
    },
    getDateOfDeath: function (author) {
      if (!author.died) {
        return "Now"
      }
      return author.died
    },
    async getAllContexts() {
      const {data:contexts} = await environment.supabaseClient
        .from('contexts')
        .select('*')
      this.contexts = contexts
    },
    async getPopulatedContextsWithAuthors() {
      const populatedContextsWithAuthors = [];
      for (const context of this.contexts) {
        const authorsOfContext = await this.getAuthorsOfContext(context.id, this.searchQuery);
        if (authorsOfContext.length !== 0) {
          populatedContextsWithAuthors.push({
            context: context,
            authors: authorsOfContext
          });
        }
      }
      return populatedContextsWithAuthors;
    },
    async getAuthorsOfContext(contextId, searchQuery) {
      if (searchQuery == "") {
        const { data: authorsOfContext } = await environment.supabaseClient
        .from("authors")
        .select("*")
        .filter("context_id", "eq", contextId);
        if (authorsOfContext.length === 0) {
          return [];
        }
        return authorsOfContext
      }
      else {
        const { data: authorsOfContext } = await environment.supabaseClient
          .from("authors")
          .select("*")
          .filter("context_id", "eq", contextId)
          .ilike("name", "%" + searchQuery + "%");
        if (authorsOfContext.length === 0) {
          return [];
        }
        return authorsOfContext
      }
    },
    async updatePopulatedContextsWithAuthors() {
      this.populatedContextsWithAuthors = await this.getPopulatedContextsWithAuthors();
      this.populatedContextsWithAuthors = this.populatedContextsWithAuthors.sort((a, b) => this.compareItemChronology(a, b))
    },
    compareItemChronology(a, b) {
      if(a.context.chronology < b.context.chronology){
        return -1
      }
      else if(a.context.chronology > b.context.chronology) {
        return 1
      }
      else {
        return 0
      }
    }
  },
  watch: {
    async searchQuery(newValue, oldValue) {
      if (newValue !== oldValue) {
        await this.updatePopulatedContextsWithAuthors();
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.headline {
  text-transform: uppercase;
  margin: 4rem auto;
  font-size: 4rem;
}

.tags {
  display: flex; 
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

h2 {
  color: #35495e;
  text-transform: capitalize;
  margin-bottom: 2rem;
}

.author {
  border: solid;
  border-width: 1px;
  border-radius: 25px;
  padding-inline: 25px;
  display: flex;
  flex-direction: column;
  h3 {
    color: #FF0000;
  }
  &:hover {
    h3 {
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
  .summary {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 150px;
    border-radius: 25px;
    z-index: -10;
  }
  padding-bottom: 10px;

  height: fit-content;
}

.centered {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 5rem;
}

.whiteBackground {
  position: fixed;
  background-color: #FFFFFF;
  height: 5vh;
  margin-top: -3vh;
  border: 1px solid #FFFFFF;
}

.searchAuthorParent {
  display: flex;
  width: 90vw;
  gap: 2vw;
  align-items: center;
  justify-content: center;
  margin-top: 0vh
}

.searchAuthor {
  width: min(70vw, 400px);
  height: 4vh;
  border-width: 0;
  border-radius: 2vh;
  padding-inline: 1rem;
  background-color: #EEEEEE;
}

.tag {
  white-space: nowrap;
}

.section {
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
}

.group {
  margin-bottom: 4rem;
}

</style>