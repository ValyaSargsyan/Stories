<template>
    <div id="app">
        <page-header/>
    </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
    name: 'App',
    components: {
        PageHeader
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
#app {
    background-color: #f7f7f7;
}
</style>
