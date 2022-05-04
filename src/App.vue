<template>
    <div id="app">
        <page-header/>
        <div class="main">
            <filters />

        </div>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import Filters from "@/components/Filters";

export default {
    name: 'App',
    components: {
        PageHeader,
        Filters,
    },
    created() {
        this.$store.dispatch("getStories");
    }
}
</script>

<style>
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
}
.main {
    max-width: 1366px;
    margin: auto;
}
</style>
