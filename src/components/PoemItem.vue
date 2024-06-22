<script setup lang="ts">
import {IPoem} from "@/type";
import userMotion from "@/hooks/useMotion";
const {initial, enter} = userMotion().scaleIn;

defineProps({
  data: {
    type: Object as () => IPoem,
    default: "tangshi"
  },
  delay: {
    type: Number,
    default: 0
  }
})


</script>

<template>
  <div
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
      <div v-if="data.paragraphs.length > 4">
        …
      </div>
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
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}


</style>