<template>
    <div class="filters-wrapper">
        <h1 class="title">Watchlist Name</h1>
        <div>
            <div class="btn-wrap">
                <button class="filter-btn" @click="refreshHandler">
                    Refresh
                </button>
                <button class="filter-btn" @click="showFilters = true">
                    Filter
                </button>
            </div>
            <div v-if="showFilters" class="filters">
                <FilterItem
                    :data="autoRefresh"
                    :selectedLabel="autoRefresh.selected"
                    inputType="radio"
                    @hide="hideAutoRefresh"
                    @toggleHandler="autoRefresh.show = !autoRefresh.show"
                    @change="selectAutoRefresh"
                />
                <FilterItem
                    :data="order"
                    :selectedLabel="order.selected"
                    inputType="radio"
                    @hide="hideOrder"
                    @toggleHandler="order.show = !order.show"
                    @change="selectOrder"
                />
                <div class="filter-wrap" v-click-outside="hideLang">
                    <div class="filter" @click="languages.show = !languages.show"
                    >
                        <div>
                            <p>{{ languages.selected.join() }}</p>
                            <p class="filter-label">{{ languages.title }}</p>
                        </div>
                        <div
                            class="arrow"
                            :class="languages.show ? 'arrow-up' : 'arrow-down'"
                        ></div>
                    </div>
                    <div v-if="languages.show" class="filter-popup">
                        <p class="popup-title">{{ languages.title }}:</p>
                        <div class="row">
                            <input type="checkbox"
                                   id="all"
                                   name="all"
                                   value="all"
                                   v-model="languages.all"
                                   @change="selectAllLanguages"
                            />
                            <label for="all" class="label">Select / Unselect All</label>
                        </div>
                        <div v-for="(item, i) in languages.data" :key="i" class="row">
                            <input
                                type="checkbox"
                                :id="item.label"
                                :name="item.label"
                                :value="item.value"
                                v-model="languages.selected"
                            >
                            <label :for="item.label" class="label">{{ item.label }}</label>
                        </div>
                    </div>
                </div>
                <button class="reset-btn" @click="reset">Reset</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import FilterItem from "@/components/FilterItem";

export default {
    name: "Filters",
    components: {
        FilterItem
    },
    data() {
        return {
            showFilters: false,
            autoRefresh: {
                show: false,
                title: 'autoRefresh',
                data: [
                    {label: '10 sec', value: 10},
                    {label: '30 sec', value: 30},
                    {label: '1 min', value: 60},
                    {label: '10 min', value: 600},
                ],
                selected: ''
            },
            order: {
                show: false,
                title: 'order',
                data: [
                    {label: 'Top', value: 'top'},
                    {label: 'Latest', value: 'latest'},
                    {label: 'Retweeted', value: 'retweeted'},
                    {label: 'Read', value: 'read'},
                ],
                selected: ''
            },
            languages: {
                show: false,
                title: 'languages',
                data: [
                    {label: 'English', value: 'en'},
                    {label: 'German', value: 'de'},
                    {label: 'Chinese', value: 'zh'},
                    {label: 'Italian', value: 'it'},
                ],
                selected: [],
                all: false
            },
            refreshIntervalId: ''
        }
    },
    watch: {
        'languages.selected'(val) {
            if (val.length < this.languages.data.length) {
                this.languages.all = false
            }
            this.setLanguages(val)
            this.getStories()
        }
    },
    methods: {
        ...mapMutations(["setNextPage", "setStories", "setOrderBy", "setLanguages"]),
        ...mapActions(["getStories"]),
        refreshHandler() {
            this.setNextPage(null)
            this.setStories([])
            this.getStories()
        },
        selectAutoRefresh(value) {
            const selected = this.autoRefresh.data.find(item => item.value === value)
            this.autoRefresh.selected = selected.label
            this.autoRefresh.show = false
            this.refreshIntervalId = setInterval(() => {
                this.refreshHandler()
            }, value * 1000);
        },
        selectOrder(value) {
            const selected = this.order.data.find(item => item.value === value)
            this.order.selected = selected.label
            this.order.show = false
            this.setOrderBy(value)
            this.getStories()
        },
        selectAllLanguages() {
            if (this.languages.all) {
                this.languages.selected = []
                this.languages.data.forEach(item => {
                    this.languages.selected.push(item.value)
                })
            } else {
                this.languages.selected = []
            }
        },
        hideAutoRefresh() {
            this.autoRefresh.show = false
        },
        hideOrder() {
            this.order.show = false
        },
        hideLang() {
            this.languages.show = false
        },
        reset() {
            clearInterval(this.refreshIntervalId)
            this.autoRefresh.selected = ''
            this.order.selected = ''
            this.setOrderBy()
            this.languages.selected = []
        }
    }
}
</script>

<style lang="scss">
.filters-wrapper {
    margin-bottom: 20px;
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

.filters {
    display: flex;
    flex-flow: wrap;
    margin-top: 15px;
    background-color: #eee;
    padding: 20px 25px;
}

.filter-wrap {
    position: relative;
    width: 185px;
    margin-right: 10px;
}

.filter {
    height: 38px;
    padding: 5px 10px;
    margin-bottom: 10px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &-label {
        color: #666666;
        text-transform: uppercase;
        font-size: 12px;
    }

    &-popup {
        width: 145px;
        position: absolute;
        top: 52px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 3px;
        box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);
        z-index: 1;

        .row {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }

        .label {
            display: block;
            margin-left: 10px;
            font-size: 14px;
            font-weight: normal;
            color: #292929;
            margin-bottom: 2px;
        }
    }
}

input[type="radio"] {
    appearance: none;
    border: 1px solid #d3d3d3;
    width: 16px;
    height: 16px;
    content: none;
    outline: none;
    margin: 0;
}

input[type="radio"]:checked {
    appearance: none;
    outline: none;
    padding: 0;
    content: none;
    border: none;
}

input[type="radio"]:checked::before {
    position: absolute;
    color: #fff !important;
    background-color: blue;
    content: "\00A0\2713\00A0" !important;
    font-weight: bolder;
    font-size: 13px;
}

.popup-title {
    font-size: 13px;
    font-weight: bold;
    color: #292929;
    margin-bottom: 15px;
    text-transform: uppercase;
}

.arrow {
    width: 6px;
    height: 6px;
    border-bottom: 1px solid #8c8c8c;
    border-left: 1px solid #8c8c8c;
    cursor: pointer;

    &-down {
        transform: rotate(-45deg);
    }

    &-up {
        transform: rotate(135deg);
    }
}
.reset-btn {
    width: 185px;
    height: 48px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 3px;
    background-color: #3971c1;
    color: #ffffff;
    border: none;
    outline: none;
}
</style>