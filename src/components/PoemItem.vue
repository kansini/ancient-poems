<script setup lang="ts">
import {ref} from "vue"
import {IPoem} from "@/type";
import userMotion from "@/hooks/useMotion";
import PoemDetail from "./PoemDetail.vue"

const {initial, enter} = userMotion().fadeIn;

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
  gap: 16px;
  flex-wrap: wrap;
  max-height: 440px;
  line-height: 1.5;
  cursor: pointer;

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
  }
}


</style>