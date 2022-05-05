<template>
    <div id="app">
        <page-header/>
        <div class="main">
            <filters />
            <div
                v-infinite-scroll="loadMore"
                infinite-scroll-distance="10"
            >
                <Publication
                    v-for="(item,i) in stories"
                    :key="i"
                    :publication="item"
                />
                <p v-if="loading" class="loading">Loading...</p>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import Filters from "@/components/Filters";
import Publication from "@/components/Publication";
import {mapGetters} from "vuex";

export default {
    name: 'App',
    components: {
        PageHeader,
        Filters,
        Publication,
    },
    computed: {
        ...mapGetters(["stories", "nextPage", "loading"])
    },
    methods: {
        loadMore() {
            this.$store.dispatch("getStories", {"next_page": this.nextPage});
        }
    }
}
</script>

<style lang="scss">
@font-face {
    font-family: "Lato";
    src: local("Lato"),
    url(./assets/fonts/Lato-Regular.ttf) format("truetype");
}
* {
    margin: 0;
    padding: 0;
    font-family: Lato;
}
#app {
    background-color: #f7f7f7;
    min-height: 100vh;
}
.main {
    max-width: 1366px;
    margin: auto;

    @media (max-width: 1366px) {
        width: 90%;
    }
}
.loading {
    margin: 10px 0;
    text-align: center;
}
</style>
