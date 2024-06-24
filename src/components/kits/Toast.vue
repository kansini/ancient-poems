<script setup lang="ts">
import {onClickOutside} from "@vueuse/core"
import {ref, watchEffect} from "vue";

const toastRef = ref()
const visible = defineModel()
defineProps({
  content: {
    type: String,
    default: ""
  }
})
watchEffect(() => {
  if (visible.value) {
    setTimeout(() => {
      visible.value = false;
    }, 1000)
  }
})
onClickOutside(toastRef, () => visible.value = false)
</script>

<template>
  <teleport to="body">
    <transition name="fadeDown">
      <div
          ref="toastRef"
          class="p-toast inset-circle"
          v-if="visible"
      >
        {{ content }}
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.p-toast {
  position: fixed;
  top: 16px;
  width: 128px;
  height: 40px;
  left: calc(50% - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  color: #fff;
  z-index: 9999;
  font-size: 15px;
  border-radius: 16px;

  &.inset-circle {
    background-size: 70% 70%;
    background-image: radial-gradient(
            circle at 100% 100%,
            transparent 0,
            transparent 8px,
            $color-red 9px
    ),
    radial-gradient(
            circle at 0 0,
            transparent 0,
            transparent 8px,
            $color-red 9px
    ),
    radial-gradient(
            circle at 100% 0,
            transparent 0,
            transparent 8px,
            $color-red 9px
    ),
    radial-gradient(
            circle at 0 100%,
            transparent 0,
            transparent 8px,
            $color-red 9px
    );
    background-repeat: no-repeat;
    background-position: right bottom, left top, right top, left bottom;
  }
}
</style>