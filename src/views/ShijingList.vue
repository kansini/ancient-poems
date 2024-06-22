<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {getList} from "@/api/getList";
import {IShijing} from "@/type";
import PButton from "@/components/kits/Button.vue";

const poemsList = reactive<IShijing[]>([])
const getPoemsList = () => {
  getList("/poems/shijing.json").then((res: any) => {
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
  <div class="poems-list">
    <template v-for="(item,index) in poemsList">
      <div class="poems-list-item" v-if="index < 5">
        <div class="poems-list-item-title">{{ item.title }}</div>
        <div class="poems-list-item-author">{{ item.chapter }}·{{ item.section }}</div>
        <div class="poems-list-item-content">
        <span v-for="(line, index) in item.content" :key="index">
          {{ line }}
        </span>
        </div>
      </div>
    </template>
  </div>
  <p-button @click="back" text="返回"/>
</template>
<style lang="scss" scoped>
.poems-list {
  font-size: 18px;
  writing-mode: vertical-rl;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .poems-list-item {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .poems-list-item-title {
      font-size: 28px;
    }

    .poems-list-item-author {
      font-size: 14px;
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

</style>