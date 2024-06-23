<script setup lang="ts">
import PButton from "@/components/kits/Button.vue";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore()

const visible = defineModel("visible", {
  default: false,
})
defineProps({
  title: {
    type: String,
    default: ""
  },
  bgColor: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["copy"])
const handelCopy = () => {
  emit("copy")
}
</script>

<template>
  <teleport to="body">
    <transition name="fadeDown">
      <div
          class="modal"
          :style="{background:bgColor}"
          v-if="visible"
      >
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <p-button
              text="关闭"
              direction="bottom"
              @mouseenter="cursorState.setCursor('mini','')"
              @mouseleave="cursorState.setCursor('default')"
              @click="visible = false"
          />
          <p-button
              text="复制"
              direction="bottom"
              @mouseenter="cursorState.setCursor('mini','')"
              @mouseleave="cursorState.setCursor('default')"
              @click="handelCopy"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.modal {
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(255, 255, 255, .5);
  backdrop-filter: saturate(120%) blur(10px);

  .modal-content {
    width: 100%;
    height: 100%;
    padding: 16px 40px;
  }

  .modal-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
}
</style>