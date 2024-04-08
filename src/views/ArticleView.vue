<template>
    <div class="article">
        <div class="loading" v-if="this.loading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-if="!this.loading">
            <div @click="$router.go(-1)" class="back" >&laquo; Back</div>
            <h2 v-if="!this.loading">
                {{article.title ?? "No article has been written yet"}}
            </h2>
            <img class="profilePicture" :src="image" v-if="image"> 
            <div v-if="article.title">
                <div v-for="(heading, index) in article.headings" :key="index">
                    <h3>
                        {{heading}}
                    </h3>
                    <p>
                        {{article.body[index]}}
                    </p>
                </div>
            </div>
            
            <p v-if="article.title">
                Written by: {{article.written_by}} <br>
                Written date: {{article.created_at.split('T')[0]}} <br>
                Last updated: {{article.last_updated.split('T')[0]}}
            </p>
            <div class="navigationFooter">
                <div @click="$router.go(-1)" class="back w-one-third" v-if="article.title">&laquo; Back</div>
                <div v-if="article.title" class="relatedAuthors w-one-third">
                    <span class="bold red underline">Related Authors</span>
                    <div v-for="relatedAuthor of article.mentioned_authors" :key="relatedAuthor">
                        {{relatedAuthor}}
                    </div>
                </div>
                <div v-if="nextArticle.id" class="furtherReading w-one-third">
                    <span class="bold red underline">Further Reading</span>
                    <div class="nextArticle next" @click="$router.push({name: 'article', params: {id: nextArticle.id}})">
                        {{nextArticle.title}} &raquo; <img :src="nextArticle.image_url">
                    </div>
                </div>
            </div>
            <div v-if="article.title">
                <h5 class="footnotes">Footnotes</h5>
                <div v-for="(footnote, index) in footnotes" :key="footnote" class="footnote">
                    <h5>
                        [{{index + 1}}]
                        <a :href="footnote.article_url">{{footnote.article_name}},</a>
                    </h5>
                    <div>
                        Authors: 
                        <span v-for="(author, index) in footnote.author_names" :key="author">
                            {{author}}<span v-if="footnote.author_names[index+1]"> | </span>
                        </span>,
                    </div>
                    <div>
                        Published: {{footnote.published_date}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { environment } from '@/environment/environment'


export default {
    name: "ArticleView",
    data() {
        return {
            article: {},
            author: {},
            nextArticle: {},
            footnotes: [],
            loading: true,
            image: ""
        }
    },
    async mounted() {
        this.loading = true
        this.article = await this.getArticle(window.location.href.split("/")[window.location.href.split("/").length-1])
        if(!this.article.title){
            this.loading = false
            return
        }
        this.author = await this.thisAuthor(this.article.about_main_author)
        if(this.article.image_url) {
            this.image = this.article.image_url
        }
        else{
            this.image = this.author.image_url
        }
        this.nextArticle = await this.getNextArticle(this.article.next_article_id)
        const footnotesTemp = await this.getFootnotes(this.article.footnotes)
        for (let footnote of this.article.footnotes) {
            let index = 0
            for (let footnoteTemp of footnotesTemp) {
                if (footnote == footnoteTemp.id){
                    this.footnotes.push(footnoteTemp)
                    footnotesTemp.pop(index, 1)
                    break
                }
                index ++
            }
        }
        this.loading = false
    },
    methods: {
        async getArticle(articleId) {
            const {data:article} = await environment.supabaseClient
                .from("articles")
                .select("*")
                .filter('id', 'eq', articleId)
            return article[0] ?? {}
        },

        async getNextArticle(nextArticleId) {
            const {data:article} = await environment.supabaseClient
                .from("articles")
                .select("id, title, image_url")
                .filter('id', 'eq', nextArticleId)
            return article[0] ?? {}
        },

        async thisAuthor(authorId) {
            const {data:author} = await environment.supabaseClient
                .from("authors")
                .select("*")
                .filter('id', 'eq', authorId)
            return author[0] ?? {}
        },

        async getFootnotes(footnoteIds) {
            const {data:footnotes} = await environment.supabaseClient
                .from("footnotes")
                .select("*")
                .filter("id", 'in', `(${footnoteIds})`)
            return footnotes
        }
    }
}
</script>

<style lang="scss">
.article {
    padding-inline: 5vw;
    padding-bottom: 5vh;
    h2 {
        color: #FF0000;
    }
}

.relatedAuthors {
    text-align: center;
}

.profilePicture {
    width: 250px;
    height: 250px;
    border-radius: 20px;
}

.navigationFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footnotes {
    margin-bottom: 0px
}

.nextArticle {
    padding: 10px;
    margin-block: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
    img {
        height: 2rem;
        border-radius: 0.5rem;
    }
}

.w-one-third {
    width: 33vw;
}

.footnote {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
}

.furtherReading {
    display: flex;
    justify-content: center;
    align-items:flex-end;
    flex-direction: column;
}

</style>