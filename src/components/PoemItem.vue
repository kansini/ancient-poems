<script setup lang="ts">
import {ref} from "vue"
import {IPoem} from "@/type";
import userMotion from "@/hooks/useMotion";
import PoemDetail from "./PoemDetail.vue";

const {initial, enter, leave} = userMotion().slideLeft;

defineProps({
  data: {
    type: Object as () => IPoem,
    default: ""
  },
  delay: {
    type: Number,
    default: 0
  }
})
const showDetail = ref(false)
const handelDetail = () => {
  showDetail.value = true;
}
</script>

<template>

  <poem-detail v-model:visible="showDetail" :data="data"/>
  <div
      @click="handelDetail"
      class="poems-list-item"
      v-motion
      :initial="initial"
      :enter="enter"
      :leave="leave"
      :delay="delay"
  >
    <div class="poems-list-item-header">
      <div class="poems-list-item-title">{{ data.title }}</div>
      <div class="poems-list-item-tag" v-if="data.author">
        <span v-if="data.section">{{ data.section }}·</span>{{ data.author }}
      </div>
      <div class="poems-list-item-tag" v-else>{{ data.chapter }}·{{ data.section }}</div>
    </div>
    <div class="poems-list-item-content">
      <template v-for="(line, index) in data.paragraphs">
        <div v-if="index < 4">
          {{ line }}
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.poems-list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  height: 400px;
  line-height: 1.5;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  padding: 32px 16px 16px;
  border-radius: 16px;
  box-shadow: 4px 4px 0 2px rgba(255, 255, 255, .5), 8px 8px 0 2px rgba(255, 255, 255, .2);
  transition: all ease-in-out .5s;

  &::after {
    position: absolute;
    content: '';
    width: 16px;
    height: 16px;
    background: $color-bg;
    border-radius: 16px;
    right: 12px;
    top: 12px;
    box-shadow: inset 2px 2px 2px 0 rgba(0, 0, 0, .08);
    transition: all ease-in-out .3s;
  }

  &:hover {
    transform: scale(1.1) translateY(24px) !important;
    box-shadow: -4px -4px 0 2px rgba(255, 255, 255, .8), -8px -8px 0 2px rgba(255, 255, 255, .5);

    &::after {
      top: 4px;
      box-shadow: inset -2px -2px 2px 0 rgba(0, 0, 0, .05);
    }
  }

  .poems-list-item-header {
    display: flex;
    gap: 8px;

    .poems-list-item-title {
      font-size: 20px;
      font-weight: bold;
      max-height: 200px;
    }

    .poems-list-item-tag {
      font-size: 14px;
      padding: 12px 4px;
      height: max-content;
      width: max-content;
      border-radius: 40px;
      color: #fff;
      background: $color-red;
    }

  }


  .poems-list-item-content {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 200px;
    overflow: hidden;
  }
}


</style>