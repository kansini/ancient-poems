<script setup lang="ts">
import {ref} from "vue"
import {IPoem} from "@/type";
import userMotion from "@/hooks/useMotion";
import PoemDetail from "./PoemDetail.vue"

const {initial, enter, leave} = userMotion().fadeIn;

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

</script>

<template>
  <poem-detail v-model:visible="showDetail" :data="data"/>
  <div
      @click="showDetail = true"
      class="poems-list-item"
      v-motion
      :initial="initial"
      :enter="enter"
      :leave="leave"
      :delay="delay"
  >
    <div class="poems-list-item-title">{{ data.title }}</div>
    <div class="poems-list-item-author" v-if="data.author">
      <span v-if="data.section">{{ data.section }}·</span>{{ data.author }}
    </div>
    <div class="poems-list-item-author" v-else>{{ data.chapter }}·{{ data.section }}</div>
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  height: 400px;
  line-height: 1.5;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  padding: 16px;
  border-radius: 16px;
  transition: all ease-in-out .5s;

  &:hover {
    transform: scale(1.1) translateY(24px) !important;
    box-shadow: 4px 4px 0 2px rgba(255, 255, 255, .5), 8px 8px 0 2px rgba(255, 255, 255, .2);
  }

  .poems-list-item-title {
    font-size: 18px;
    font-weight: bold;
  }

  .poems-list-item-author {
    font-size: 12px;
    padding: 12px 4px;
    height: max-content;
    border-radius: 40px;
    color: #fff;
    background: $color-red;
  }

  .poems-list-item-content {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 200px;
    overflow: hidden;
  }
}


</style>