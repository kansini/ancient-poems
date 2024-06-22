<script setup lang="ts">
import {IPoetry} from "@/type";
import userMotion from "@/hooks/useMotion";

const {motionOption} = userMotion();

defineProps({
  data: {
    type: Object as () => IPoetry,
    default: () => {
    }
  },
  delay: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["click", "mouseenter"])
const onMouseenter = () => {
  emit("mouseenter")
}
const handleClick = (data: IPoetry) => {
  emit("click", data.id)
}
</script>

<template>
  <div class="poetry-item"
       :class="{'is-active':active}"
       v-motion
       :initial="motionOption.initial"
       :enter="motionOption.enter"
       :delay="delay"
       @mouseenter="onMouseenter"
       @click="handleClick(data)"
  >
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
  writing-mode: vertical-rl;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all ease .3s;

  &.is-active {
    writing-mode: initial;
    margin-bottom: 80px;

    &::before {
      width: 4px;
      height: 100%;
      left: -12px;
      top: 0;
      transform: scaleX(1);
    }

    .poetry-item-title {
      font-size: 28px;
    }

    .poetry-item-desc {
      font-size: 18px;
    }
  }

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