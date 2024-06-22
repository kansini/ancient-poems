<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getList} from "@/api/getList";
import {IPoem} from "@/type";
import PButton from "@/components/kits/Button.vue";
import userMotion from "@/hooks/useMotion";
import PAnimation from "@/components/kits/Animation.vue";

const {initial, enter} = userMotion().fadeIn;

const poemsList = ref<IPoem[]>([])
const getPoemsList = (name: string) => {
  return new Promise((resolve) => {
    getList(`/poems/${name}.json`).then((res: any) => {
      resolve(res.data)
    })
  })
}
const emit = defineEmits(["back"])
const back = () => {
  emit("back")
}
const props = defineProps({
  name: {
    type: String,
    default: "tangshi"
  }
})
const show = defineModel("show", {
  default: false,
  type: Boolean
})
const loading = ref(true)
watchEffect(() => {
  if (show.value) {
    getPoemsList(props.name).then((res: any) => {
      poemsList.value = res
    }).finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
  }
})
</script>

<template>
  <div class="poems-list-container" v-if="show">
    <div class="poems-list-loading" v-if="loading">
      <transition name="fadeIn">
        <p-animation
            autoplay
            name="loading-book"
            :width="240"
            :height="240"
        />
      </transition>
    </div>
    <div class="poems-list" v-else>
      <template v-for="(item, index) in poemsList">
        <div
            class="poems-list-item"
            v-if="index < 5"
            v-motion
            :initial="initial"
            :enter="enter"
            :delay="100+ 100 * index"
        >
          <div class="poems-list-item-title">{{ item.title }}</div>
          <div class="poems-list-item-author" v-if="item.author">
            <span v-if="item.section">{{ item.section }}·</span>{{ item.author }}
          </div>
          <div class="poems-list-item-author" v-else>{{ item.chapter }}·{{ item.section }}</div>
          <div class="poems-list-item-content">
            <template v-for="(line, index) in item.paragraphs">
              <div v-if="index < 4">
                {{ line }}
              </div>
            </template>
            <div v-if="item.paragraphs.length > 4">
              …
            </div>
          </div>
        </div>
      </template>
    </div>
    <p-button @click="back" text="返回"/>
  </div>
</template>
<style lang="scss" scoped>
.poems-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 64px;

  .poems-list {
    font-size: 16px;
    width: 80%;
    writing-mode: vertical-rl;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 48px;

    .poems-list-item {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex-wrap: wrap;
      max-height: 440px;
      line-height: 1.5;

      .poems-list-item-title {
        font-size: 18px;
        font-weight: bold;
      }

      .poems-list-item-author {
        font-size: 12px;
        padding: 12px 4px;
        height: max-content;
        border-radius: 40px;
        color: #fff;
        background: $color-red;
      }

      .poems-list-item-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }
}


</style>