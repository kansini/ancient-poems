<script setup lang="ts">
import {onMounted, reactive} from "vue";
import Cursor from "@/components/kits/CustomCursor.vue";
import {getList} from "@/api/getList";
import {IPoem} from "@/type";
const poemsList = reactive<IPoem[]>([])
const getPoemsList = () => {
  getList("/poems/poet.tang.1000.json", {author: "李白"}).then((res: any) => {
    Object.assign(poemsList, res.data)
  })
}
onMounted(() => {
  getPoemsList()
})
</script>

<template>
  <cursor/>
  <div class="poems-list">
    <div class="poems-list-item" v-for="(item, index) in poemsList" :key="index">
      <div class="poems-list-item-title">{{ item.title }}</div>
      <div class="poems-list-item-author">唐·{{ item.author }}</div>
      <div class="poems-list-item-content">
        <span v-for="(line, index) in item.paragraphs" :key="index">
          {{ line }}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.poems-list {
  font-size: 24px;
  writing-mode: vertical-rl;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .poems-list-item {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .poems-list-item-title {
      font-size: 28px;

      &::before {
        content: '「';
      }

      &::after {
        content: '」';
      }
    }

    .poems-list-item-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }


}

</style>