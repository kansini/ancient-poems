<script setup lang="ts">
import {reactive, onMounted} from "vue";
import {getList} from "@/api/getList";
import {IPoetry} from "@/type";
import PoemList from "./PoemList.vue";
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


</script>

<template>
  <div class="contents-withFigure-container">
    <div class="contents-withFigure-body">
      <div class="contents-withFigure-cate-list">
        <div class="contents-withFigure-cate" v-for="cate in poetryList">
          <div class="contents-withFigure-cate-thumb"
               @mouseenter="cursorState.setCursor('large',cate.title)"
               :style="{background: `rgba(255,255,255,.1) url(./thumbs/${cate.name}.jpg) center`}">
            <div class="contents-withFigure-cate-title">{{ cate.title }}</div>
          </div>
          <div @mouseenter="cursorState.setCursor('mini','')" @mouseleave="cursorState.setCursor('default')">
            <poem-list :name="cate.name"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contents-withFigure-container {
  position: relative;
  padding: 0 24px;
  height: 100%;
  align-items: center;
  gap: 16px;

  .contents-withFigure-title {
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

  .contents-withFigure-body {
    .contents-withFigure-cate-list {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;


      .contents-withFigure-cate {
        position: relative;
        cursor: pointer;
        padding: 16px 0;
        width: 10%;
        border-radius: 0;
        transition: all ease-in .3s;

        .contents-withFigure-cate-thumb {
          position: relative;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          aspect-ratio: .815;
          border-radius: 8px;
          overflow: hidden;
          background-size: cover !important;
          padding: 16px;
          background-blend-mode: difference;
          transition: all ease-in .3s;

          &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.40) 3%, rgba(255, 255, 255, 0.40) 4%, rgba(255, 255, 255, 0.08) 6%);
            z-index: 9;
          }


          .contents-withFigure-cate-title {
            font-size: 20px;
            color: #fff;
            font-weight: bold;
            letter-spacing: 8px;
            writing-mode: vertical-rl;
            mix-blend-mode: overlay;
            background: $color-primary;
            padding: 12px 4px;
            border-radius: 8px;
            height: max-content;
          }

          &:hover {
            transform: scale(1.05);
            box-shadow: -2px 2px 0 2px $color-primary-light, -4px 4px 0 2px $color-primary-light;
          }
        }
      }
    }
  }
}

</style>