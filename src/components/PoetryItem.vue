<script setup lang="ts">
import {IPoetry} from "@/type";

defineProps({
  data: {
    type: Object as () => IPoetry,
    default: () => {
    }
  }
})
const emit = defineEmits(["click", "mouseenter"])
const onMouseenter = () => {
  emit("mouseenter")
}
const handleClick = (data: IPoetry) => {
  emit("click", data)
}
</script>

<template>
  <div class="poetry-item" @mouseenter="onMouseenter" @click="handleClick(data)">
    <div class="poetry-item-title">
      {{ data.title }}
    </div>
    <div class="poetry-item-desc">
      {{ data.desc }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.poetry-item {
  position: relative;
  writing-mode: vertical-lr;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0;
    top: -12px;
    border-radius: 4px;
    background: $color-red;
    transform: scaleX(0);
    transform-origin: right;
    transition: all ease .3s;
  }

  &:hover {
    &::before {
      transform: scaleX(1);
      background: $color-gold;
    }
  }

  .poetry-item-title {
    font-size: 24px;
  }

  .poetry-item-desc {
    font-size: 14px;
    color: $color-gold;

  }
}
</style>