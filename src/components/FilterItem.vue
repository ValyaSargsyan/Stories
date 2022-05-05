<template>
    <div class="filter-wrap" v-click-outside="hide">
        <div class="filter" @click="$emit('toggleHandler')"
        >
            <div>
                <p>{{ selectedLabel }}</p>
                <p class="filter-label">{{ data.title }}</p>
            </div>
            <div
                class="arrow"
                :class="data.show ? 'arrow-up' : 'arrow-down'"
            ></div>
        </div>
        <div v-if="data.show" class="filter-popup">
            <p class="popup-title">{{ data.title }}:</p>
            <div v-for="(item, i) in data.data" :key="i" class="row">
                <input
                    :type="inputType"
                    :id="item.label"
                    :name="item.label"
                    :value="item.value"
                    v-model="selected"
                    @change="changeHandler(i)"
                >
                <label :for="item.label" class="label">{{ item.label }}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterItem",
    props: {
        data: {
            type: Object
        },
        inputType: {
            type: String
        },
        selectedLabel: {
            type: String
        },
    },
    data() {
        return {
            selected: '',
        }
    },
    methods: {
        hide() {
            this.$emit('hide')
        },
        changeHandler() {
            this.$emit('change', this.selected)
        }
    }
}
</script>
