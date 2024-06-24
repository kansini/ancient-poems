<script setup lang="ts">
import {reactive, onMounted, ref} from "vue";
import {getList} from "@/api/getList.ts";
import {IPoetry} from "@/type";
import PoemContents from "./PoemContents.vue";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore();


const poetryList = reactive<IPoetry[]>([])
const getPoetryList = async () => {
  getList("poetry.json").then((res: any) => {
    Object.assign(poetryList, res.data)
  })
}

onMounted(() => {
  getPoetryList()
})
const currentCate = ref("shijing")
const handleSwitchCate = (cate: IPoetry) => {
  currentCate.value = cate.name
}
</script>

<template>
  <div class="contents-container"
       @mouseenter="cursorState.setCursor('mini','')"
       @mouseleave="cursorState.setCursor('default')">
    <div class="contents-body">
      <div class="contents-cate-list">
        <div class="contents-cate"
             v-for="cate in poetryList"
             @click="handleSwitchCate(cate)"
             :class="{'active': currentCate === cate.name}"
        >
          <div class="contents-cate-title">{{ cate.title }}</div>
        </div>
      </div>
      <poem-contents :name="currentCate"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contents-container {
  position: relative;
  padding:0 24px;
  height: 100%;
  align-items: center;
  gap: 16px;

  .contents-title {
    position: absolute;
    height: 100%;
    display: flex;
    justify-content: center;
    right: 0;
    top: 0;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 8px;
    writing-mode: vertical-rl;
  }

  .contents-body {
    .contents-cate-list {
      height: 100%;
      width: 100%;
      display: flex;
      gap: 24px;
      border-bottom: 2px solid $color-primary-light;

      .contents-cate {
        position: relative;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 0;
        transition: all ease-in .3s;

        .contents-cate-title {
          font-size: 20px;

        }

        &::after {
          position: absolute;
          content: '';
          width: 100%;
          height: 2px;
          background: $color-primary;
          left: 0;
          bottom: 0;
          transform: scaleX(0);
          transition: all ease-in .3s;
        }

        &.active {
          color: $color-primary;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px 8px 0 0;
          transform: scale(1.1);

          &::after {
            transform: scaleX(1);
          }
        }
      }
    }
  }
}

</style>