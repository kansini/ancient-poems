<script setup lang="ts">
import {computed, ref, watchEffect} from "vue";
import {getList} from "@/api/getList.ts";
import {IPoem} from "@/type";
import PButton from "@/components/kits/Button.vue";
import PoemItem from "@/components/PoemItem.vue";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore();
const poemsTotalList = ref<IPoem[]>([])
const getPoemsList = (name: string) => {
  return new Promise((resolve) => {
    getList(`/poems/${name}.json`).then((res: any) => {
      resolve(res.data)
    })
  })
}
const pageSize = ref(5);
const current = ref(1);
const totalPage = computed(() => {
  return Math.ceil(poemsTotalList.value.length / pageSize.value);
});
const poemsList = computed(() => {
  // 总页数
  // 确保当前页数在有效范围内
  current.value = Math.min(Math.max(current.value, 1), totalPage.value);

  // 根据当前页数和每页大小计算起始索引和结束索引
  const startIndex = (current.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;

  // 返回当前页的诗歌数据
  return poemsTotalList.value.slice(startIndex, endIndex);
})
const emit = defineEmits(["back"])
const back = () => {
  current.value = 1
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
const position = ref(0)
const contentStyle = computed(() => {
  return {
    transform: `translateX(${position.value}%)`
  }
})
const reload = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false
  })
}
const handlePre = () => {
  if (current.value > 1) {
    current.value--;
    reload();
  }
}
const handleNext = () => {
  if (current.value < totalPage.value) {
    current.value++;
    reload();
  }
}
watchEffect(() => {
  if (show.value) {
    loading.value = true;
    getPoemsList(props.name).then((res: any) => {
      poemsTotalList.value = res
    }).finally(() => {
      loading.value = false
    })
  }
})
</script>

<template>
  <div class="poems-list-container" v-if="show">
    <div class="poems-list-nav--pre"
         v-if="current > 1"
         @mouseenter="cursorState.setCursor('large','上一页')"
         @click="handlePre"
    ></div>
    <div class="poems-list-nav--next"
         @mouseenter="cursorState.setCursor('large','下一页')"
         @click="handleNext"></div>
    <div class="poems-list" @mouseenter="cursorState.setCursor('default')">
      <div class="poems-list-content"
           v-if="!loading"
           :style="contentStyle"
      >
        <template v-for="(item,index) in poemsList">
          <poem-item
              :delay="100+ index * 200"
              :data="item"/>
        </template>
      </div>
    </div>
    <div class="btn-group">
      <p-button v-if="current > 1" text="上一页" @click="handlePre"/>
      <p-button v-if="current < totalPage" text="下一页" @click="handleNext"/>
      <p-button @click="back" text="返回"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.poems-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 64px;

  [class^="poems-list-nav--"] {
    position: absolute;
    width: 200px;
    height: 100%;
    top: 0;
    z-index: 1;
    cursor: pointer;
    background: rgba(104, 54, 26, 0);
    backdrop-filter: blur(8px);
  }

  .poems-list-nav--pre {
    left: 0;
  }

  .poems-list-nav--next {
    right: 0;
  }

  .poems-list {
    position: relative;
    font-size: 16px;
    width: calc(100% - 240px);
    height: 400px;
    overflow: hidden;


    .poems-list-content {
      width: 100%;
      writing-mode: vertical-rl;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 48px;
      transition: all ease .3s;
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
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
}


</style>