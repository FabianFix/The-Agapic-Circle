<template>
  <div class="home">
    <div class="timePeriods">
      <div v-for="(section, index) in Object.keys(authors)" :key="index" class="group">
        <h2 class="center">{{section}}</h2>
        <div class="section" v-for="author in authors[section]" :key="author.id">
          <div class="author">
            <h3 class="authorProfile" @click="$router.push({name: author.id})">
              {{author.title}}
              <img v-bind:src="author.imageUrl">
              <span class="subtitle">{{author.born[6] + author.born[7] + author.born[8] + author.born[9]}} - {{author.died[6] + author.died[7] + author.died[8] + author.died[9]}}</span>
            </h3>
            <p>{{author.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AUTHORS from '../statics/authors.json'

export default {
  name: 'HomeView',
  computed: {
    authors() {
      return AUTHORS
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
img {
  display: block;
  margin: 0 auto;
  width: 150px;
}

h2 {
  color: #35495e;
  text-transform: capitalize;
  margin-bottom: 2rem;
}

h3 {
  display: flex;
  flex-direction: column;
  color: #FF0000;
  margin-bottom: 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  .subtitle {
    color: grey;
    font-size: .98rem;
    float: right;
    font-weight: normal;
  }
}

p {
  margin-top: .4rem;
}

.sections {
  max-width: 40vw;
  margin: 0 auto;
  margin-top: 4rem;
}

.section {
  margin-bottom: 3rem;
}

.group {
  margin-bottom: 4rem;
}

</style>