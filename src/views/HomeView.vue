<template>
  <div class="home">
    <div class="whiteBackground">
      <div class="searchAuthorParent">
        <input v-model="searchQuery" class="searchAuthor" placeholder="Search for a thinker" id=searchAuthor>
        <router-link :to="``">
          <img src="https://res.cloudinary.com/dzc0tlbqw/image/upload/v1711999509/ox7va20ary2dt12zudkz.png" alt="" class="magnifyingGlass">
        </router-link>
      </div>
    </div>
    <div class="timePeriods">
      <div v-for="context in getNotEmptyContexts(authors, contexts, this.searchQuery)" :key="context.chronologicalOrder" class="group">
        <h2 class="center">{{context.name}}</h2>
        <div class="section">
          <div v-for="author in getAuthorsOfContext(authors, context, this.searchQuery)" :key="author.id">
            <div class="author" @click="$router.push({name: author.id})">
              <h3>{{author.name}}</h3>
              <img v-bind:src="author.imageUrl">
              <span class="subtitle">{{getDateOfBirth(author)}} - {{getDateOfDeath(author)}}</span>
                <div class="tags">
                  <div class="subtitle tag" v-for="tag in author.tags" :key="tag">
                    {{tag}}
                  </div>
                </div>
              <p class="subtitle"><i>{{author.summary}}</i></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AUTHORS from '../statics/authors.json'
import CONTEXTS from '../statics/contexts.json'

export default {
  name: 'HomeView',
  data() {
    return {
      searchQuery: ""
    }
  },
  computed: {
    authors() {
      return AUTHORS
    },
    contexts() {
      return CONTEXTS
    }
  }, 
  methods: {
    getDateOfBirth: function (author) {
      return author.born.slice(6)
    },
    getDateOfDeath: function (author) {
      if (author.died.length < 4) {
        return "Now"
      }
      return author.died.slice(author.died.length-4, author.died.length)
    },
    getAuthorsOfContext: function (authors, context, searchQuery) {
      return authors.filter((author) => {
        if(author.context == context.id) {
          if(searchQuery != "") {
            if (author.name.toLowerCase().includes(searchQuery.toLowerCase())){
              return true
            }
            return false
          }
          return true
        }
      })
    },
    searchQueryChange(evt) {
      this.searchQuery = evt.target.value
    },
    getNotEmptyContexts: function (authors, contexts, searchQuery) {
      const populatedContexts = contexts.filter((context => {
        if(this.getAuthorsOfContext(authors, context, searchQuery).length != 0){
          return true
        }
      }))
      return populatedContexts
    }
  }
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
    height: 2.5rem;
  }
  width: 150px;
  &:hover {
    h3 {
       text-decoration: underline;
    }
  }
  margin-bottom: 0;
  cursor: pointer;
  .subtitle {
    color: grey;
    font-size: 0.8rem;
    float: right;
    font-weight: normal;
  }
  img {
    display: block;
    margin: 0 auto;
    width: 150px;
    border-radius: 25px;
  }
  padding-bottom: 10px;
}

.whiteBackground {
  position: fixed;
}

.searchAuthorParent {
  width: 100vw;
  display: flex;
  gap: 2vw;
  align-items: center;
  justify-content: center;
  margin-top: -3vh
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