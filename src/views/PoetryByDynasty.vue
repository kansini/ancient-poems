<script setup lang="ts">
import {ref} from "vue";
import {useCsvToJson} from "@/hooks/useCsvToJson";
import {useCursorStore} from "@/store";
import PoemByDynastyItem from "@/components/PoemByDynastyItem.vue"

const cursorState = useCursorStore();

const {jsonData, getJsonData} = useCsvToJson();
const poemList = ref(jsonData)
const pageSize = ref(20);
const currentPage = ref(1);
const dynasties = ref<string[]>([
  "先秦",
  "秦",
  "汉",
  "魏晋",
  "南北朝",
  "隋",
  "隋末唐初",
  "唐",
  "宋",
  "元"]);
const dynasty = ref("先秦")
const handleNav = (d: string) => {
  dynasty.value = d
  getJsonData(d, currentPage.value, pageSize.value)
}
</script>

<template>
  <div
      class="dynasty-list"
      @mouseenter="cursorState.setCursor('mini','')"
      @mouseleave="cursorState.setCursor('default')"
  >
    <div
        v-for="d in dynasties"
        @click="handleNav(d)">
      {{ d }}
    </div>
  </div>
  <div class="poetry-by-dynasty-list">
    <template v-for="(item, index) in poemList">
      <PoemByDynastyItem
          :data="item"
          :delay="index * 100"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.dynasty-list {
  display: flex;
  gap: 16px;
  padding: 16px 40px;

  div {
    cursor: pointer;
  }
}

.poetry-by-dynasty-list {
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>