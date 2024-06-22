<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getList} from "@/api/getList.ts";
import {IPoem} from "@/type";
import PButton from "@/components/kits/Button.vue";
import PAnimation from "@/components/kits/Animation.vue";
import PoemItem from "@/components/PoemItem.vue"


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
    loading.value = true;
    getPoemsList(props.name).then((res: any) => {
      poemsList.value = res
    }).finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000);
    })
  }
})
</script>

<template>
  <div class="poems-list-container" v-if="show">
    <transition name="fadeIn">
      <div class="poems-list-loading" v-if="loading">
        <p-animation
            autoplay
            name="loading-book"
            :width="240"
            :height="240"
        />
      </div>
    </transition>
    <div class="poems-list">
      <div class="poems-list-content" v-if="!loading">
        <template v-for="(item, index) in poemsList">
          <poem-item
              v-if="index < 5"
              :data="item"
              :delay="200+ 300 * index"
          />
        </template>
      </div>
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
    width: 100%;
    padding: 0 40px;
    height: 400px;

    .poems-list-content {
      width: 100%;
      writing-mode: vertical-rl;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 64px;
    }
  }

  .poems-list-loading {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    //background: rgba(255, 255, 255, .1);
    //backdrop-filter: blur(4px);
    //z-index: 999;
  }
}


</style>