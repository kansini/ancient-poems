<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {getList} from "@/api/getList";
import {IPoem} from "@/type";
import PButton from "@/components/kits/Button.vue";
import userMotion from "@/hooks/useMotion";

const {motionOption} = userMotion();

const poemsList = reactive<IPoem[]>([])
const getPoemsList = () => {
  getList("/poems/poet.tang.1000.json").then((res: any) => {
    Object.assign(poemsList, res.data)
  })
}
const emit = defineEmits(["back"])
const back = () => {
  emit("back")
}
onMounted(() => {
  getPoemsList()
})
</script>

<template>
  <div class="poems-list-container">
    <div class="poems-list">
      <template v-for="(item, index) in poemsList">
        <div
            class="poems-list-item"
            v-if="index < 5"
            v-motion
            :initial="motionOption.initial"
            :enter="motionOption.enter"
            :delay="100 + 300 * index"
        >
          <div class="poems-list-item-title">{{ item.title }}</div>
          <div class="poems-list-item-author">唐·{{ item.author }}</div>
          <div class="poems-list-item-content">
        <span v-for="(line, index) in item.paragraphs" :key="index">
          {{ line }}
        </span>
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

      .poems-list-item-title {
        font-size: 18px;
        font-weight: bold;
      }

      .poems-list-item-author {
        font-size: 12px;
        padding: 12px 8px;
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