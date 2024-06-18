<script setup lang="ts">
import {onMounted, reactive} from "vue";
import Cursor from "@/components/kits/CustomCursor.vue";
import {getList} from "@/api/getList";
import {IPoem} from "@/type"

const poemsList = reactive<IPoem[]>([])
const getPoemsList = () => {
  getList("/poems/poet.tang.10000.json").then((res: any) => {
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
      <div class="poems-list-item-author">{{ item.author }}</div>
      <div class="poems-list-item-content">
        <span v-for="(line, index) in item.paragraphs" :key="index">
          {{ line }}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.poems-list{
  font-family: "FangZhengFangSong", serif;
  writing-mode: vertical-rl;
}

</style>