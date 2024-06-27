<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getList} from "@/api/getList";
import {IPoem} from "@/type";
import PoemDetail from "@/components/PoemDetail.vue";


const poemsList = ref<IPoem[]>([])
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
    poemsList.value = res.data
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
</script>

<template>
  <poem-detail v-model:visible="showDetail" :data="detailData"/>
  <div class="poem-contents">
    <template v-for="item in poemsList">
      <div class="poem-contents-item" @click="handleDetail(item)">
        <div class="poem-contents-item-title">
          {{ item.title }}
        </div>
        <div class="poems-contents-item-tag" v-if="item.author">
          <span v-if="item.section">{{ item.section }}·</span>{{ item.author }}
        </div>
        <div class="poems-contents-item-tag" v-else>{{ item.chapter }}·{{ item.section }}</div>
        <div class="poem-contents-item-paragraph">{{ item.paragraphs[0] }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.poem-contents {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  gap: 16px;
  padding: 16px 0;
  max-height: calc(100vh - 72px);

  .poem-contents-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: calc(12.5% - 16px);
    cursor: pointer;
    background: #fff;
    padding: 8px;
    border-radius: 8px;
    transition: all ease-in .5s;

    &:hover {
      transform: scale(1.8);
      box-shadow: 4px 4px 0 2px rgba(255, 255, 255, .8), 8px 8px 0 2px rgba(255, 255, 255, .5);
    }

    .poem-contents-item-title {
      font-size: 16px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .poems-contents-item-tag {
      font-size: 12px;
      padding: 4px 8px;
      height: max-content;
      width: max-content;
      border-radius: 40px;
      color: $color-primary;
      background: $color-primary-light;
    }

    .poem-contents-item-paragraph {
      width: 100%;
      font-size: 13px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $color-blue;
    }
  }
}
</style>