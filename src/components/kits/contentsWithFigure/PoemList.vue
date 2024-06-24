<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
import {getList} from "@/api/getList.ts";
import {IPoem} from "@/type";
import PoemDetail from "@/components/PoemDetail.vue";
import {NUM} from "@/enum/num";


const poemsTotalList = ref<IPoem[]>([])
const props = defineProps({
  name: {
    type: String,
    default: ""
  },
  delay: {
    type: Number,
    default: 0
  }
})
const getPoemsList = (name: string) => {
  getList(`/poems/${name}.json`).then((res: any) => {
    poemsTotalList.value = res.data
  })
}

watchEffect(() => {
  getPoemsList(props.name)
})
const showDetail = ref(false)
const detailData = ref<IPoem>()
const handleDetail = (item: IPoem) => {
  showDetail.value = true
  detailData.value = item
}
const pageSize = ref(16);
const current = ref(1);
const totalPage = computed(() => {
  return Math.ceil(poemsTotalList.value.length / pageSize.value);
});
const poemsList = computed(() => {
  current.value = Math.min(Math.max(current.value, 1), totalPage.value);
  const startIndex = (current.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return poemsTotalList.value.slice(startIndex, endIndex);
})

const handlePre = () => {
  if (current.value > 1) {
    current.value--;
  }
}
const handleNext = () => {
  if (current.value < totalPage.value) {
    current.value++;
  }
}
const getNumText = (index: number) => {
  const numArr = index.toString().split("")
  const numCnArr = numArr.map((item: string) => {
    return NUM[parseInt(item)]
  })
  return numCnArr.join("")
}
</script>

<template>
  <poem-detail v-model:visible="showDetail" :data="detailData"/>
  <div class="poem-contents-list">
    <template v-for="item in poemsList">
      <div class="poem-contents-list-item"
           @click="handleDetail(item)">
        <div class="poem-contents-list-item-title">
          {{ item.title }}
        </div>
        <div class="poem-contents-list-item-paragraph">{{ item.paragraphs[0] }}</div>
      </div>
    </template>
  </div>
  <span class="page-num">{{ getNumText(current) }} / {{ getNumText(totalPage) }}</span>
  <div class="poem-contents-list-pagination">
    <a v-if="current < totalPage" @click="current = totalPage">末</a>
    <a v-if="current > 1" @click="handlePre">上一页</a>
    <a v-if="current < totalPage" @click="handleNext">下一页</a>
    <a v-if="current > 1" @click="current = 1">首</a>
  </div>
</template>

<style scoped lang="scss">
.poem-contents-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 8px;
  padding: 16px 0;
  width: 100%;
  max-height: calc(100vh - 72px);

  .poem-contents-list-item {
    cursor: pointer;
    height: 36px;
    transition: all ease-in .3s;

    .poem-contents-list-item-title {
      font-size: 16px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .poem-contents-list-item-paragraph {
      width: 100%;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:hover {
      color: $color-red;
      transform: scale(1.1) translateX(8px);
    }
  }
}

.page-num {
  font-size: 12px;
  color: $color-red;
}

.poem-contents-list-pagination {
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  font-size: 13px;

}
</style>