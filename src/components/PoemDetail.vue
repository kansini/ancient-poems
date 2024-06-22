<script setup lang="ts">
import {IPoem} from "@/type";
import PModal from "./kits/Modal.vue"

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
const visible = defineModel("visible", {
  default: false,
})

</script>

<template>
  <p-modal v-model:visible="visible">
    <div class="poem-detail">
      <div class="poem-detail-header">
        <div class="poem-detail-title">{{ data.title }}</div>
        <div class="poem-detail-author" v-if="data.author">
          <span v-if="data.section">{{ data.section }}·</span>{{ data.author }}
        </div>
        <div class="poem-detail-author" v-else>{{ data.chapter }}·{{ data.section }}</div>
      </div>
      <div class="poem-detail-content">
        <template v-for="line in data.paragraphs">
          <div>
            {{ line }}
          </div>
        </template>
      </div>
    </div>
  </p-modal>
</template>
<style lang="scss" scoped>

.poem-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 20px;
  height: 100%;

  .poem-detail-header {
    display: flex;
    align-items: center;
    gap: 8px;

    .poem-detail-title {
      font-size: 28px;
      font-weight: bold;
    }

    .poem-detail-author {
      font-size: 14px;
      padding: 4px 12px;
      border-radius: 40px;
      color: #fff;
      background: $color-red;
      letter-spacing: 4px;
    }
  }


  .poem-detail-content {
    display: flex;
    flex-direction: column;

    max-height: calc(100% - 48px);
    overflow-y: auto;
    gap: 16px;
  }
}


</style>