<script setup lang="ts">
import {reactive} from "vue";
import MotionItem from "./kits/MotionItem.vue"

interface ILink {
  title: string,
  thumbnail: string,
  link: string
}

const links = reactive<ILink[]>([
  {
    title: "中国典籍",
    thumbnail: "classics",
    link: "https://ancient-classics.cn/",
  },
  {
    title: "推背图",
    thumbnail: "tuibei",
    link: "https://tuibeitu.netlify.app/",
  },
  {
    title: "中国传统色",
    thumbnail: "colors",
    link: "https://colors.ancient-classics.cn/",
  },
  {
    title: "中国传统乐器",
    thumbnail: "music",
    link: "https://music.ancient-classics.cn/",
  }
])
</script>

<template>
  <div class="links-list">
    <motion-item
        class="links-list-item"
        v-for="(item,index) in links"
        :delay="200 + 400 * index"
        type="scaleIn">
      <a :href="item.link" target="_blank">
        <div class="link-thumb" :style="{'background-image': `url(./shortcut/thumb-${item.thumbnail}.jpg)`}"></div>
        <div class="link-title">
          <span>{{ item.title }}</span>
        </div>
      </a>
    </motion-item>

  </div>
</template>

<style scoped lang="scss">
.links-list {
  width: 100%;
  height: 100%;
  display: flex;
  writing-mode: initial;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 0 40px;

  .links-list-item {
    display: block;
    position: relative;
    width: 20%;
    aspect-ratio: 40/25;
    background-size: cover;
    border-radius: 8px;
    overflow: hidden;

    .link-thumb {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-size: cover;
      transition: all ease-in 0.3s;
    }

    .link-title {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0);
      background: rgba(0, 0, 0, 0);
      transition: all ease-in 0.3s;
      padding: 16px;
    }


    &:hover {
      .link-thumb {
        transform: scale(1.8);
      }

      .link-title {
        font-size: 22px;
        font-weight: bold;
        background: rgba(0, 0, 0, .2);
        backdrop-filter: blur(4px);
        color: rgba(255, 255, 255, 1);
        justify-content: center;
        align-items: center;
      }

    }
  }
}
</style>