<template>
    <div class="publication">
        <img class="publication-img" :src="publication.domain_cached_large_logo_url"/>
        <div class="publication-content">
           <div>
               <a
                   :href="publication.url"
                   target="_blank"
                   class="publication-title"
               >
                   {{ publication.title }}
               </a>
               <p
                   v-if="publication.uuid === selected"
                   class="publication-description"
               >
                   {{publication.description}}
               </p>
               <p class="author">
                   <img :src="authorImg" class="author-image" />
                   <span class="author-name">{{publication.author_screen_name || 'unknown author'}}</span>
               </p>
           </div>
            <div
                class="arrow"
                :class="publication.uuid === selected ? 'arrow-up' : 'arrow-down'"
                @click="showDescription"
            ></div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Publication",
    props: {
        publication: {
            type: Object
        }
    },
    data() {
        return {
            selected: ''
        }
    },
    computed: {
        authorImg() {
            return this.publication.author_image_url ?
                this.publication.author_image_url : require('@/assets/images/user.svg')
        },
    },
    methods: {
        showDescription() {
            if(this.selected === this.publication.uuid) {
                this.selected = ""
            } else {
                this.selected = this.publication.uuid
            }
        }
    }
}
</script>

<style scoped lang="scss">
.publication {
    display: flex;
    border: 1px solid #e0e0e0;
    background-color: #ffffff;
    margin-bottom: 7px;

    &-content {
        display: flex;
        justify-content: space-between;
        margin: 12px 20px;
        width: 90%;
    }
    &-img {
        height: 75px;
        width: auto;
    }
    &-title {
        display: block;
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 12px;
        text-decoration: none;
        color: #000;
        &:hover {
            text-decoration: underline;
        }
    }

    &-description {
        font-size: 15px;
        font-weight: normal;
        margin-bottom: 15px;
        color: #292929;
    }

    .arrow {
        width: 10px;
        height: 10px;
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
    .author {
        display: flex;
        align-items: center;
        &-image {
            width: 20px;
        }
        &-name {
            font-size: 12px;
            font-weight: normal;
            color: #666;
            margin: 0 10px;
        }
    }
}
</style>