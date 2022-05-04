<template>
    <div class="filters-wrapper">
        <h1 class="title">Watchlist Name</h1>
        <div>
            <div class="btn-wrap">
                <button class="filter-btn">
                    Refresh
                </button>
                <button class="filter-btn" @click="showFilters = true">
                    Filter
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Filters",
    data() {
        return {
            showFilters: false,
        }
    }
}
</script>

<style scoped lang="scss">
.filters-wrapper {
    margin-bottom: 20px;
    @media only screen and (max-width: 768px) and (min-width: 430px)  {
        display: flex;
    }
}
.title {
    font-size: 24px;
    font-weight: bold;
    color: #3971c1;
    margin-bottom: 15px;
}
.filter-btn {
    background-color: #ffffff;
    color: #292929;
    font-size: 13px;
    font-weight: bold;
    padding: 12px;
    border: 1px solid #e0e0e0;
    cursor: pointer;

    &:first-child {
        margin-right: 6px;
    }

    &:hover {
        background-color: #eeeeee;
        border: 1px solid #eeeeee;
    }
}
</style>