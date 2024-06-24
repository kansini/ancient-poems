<script setup lang="ts">
import {computed, ref} from "vue";
import PButton from "@/components/kits/Button.vue";
import {useCursorStore} from "@/store";
import {onClickOutside} from "@vueuse/core";

const cursorState = useCursorStore()

const visible = defineModel("visible", {
  default: false,
})
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  bgColor: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: "100%"
  },
  direction: {
    type: String,
    default: "top"
  },
  footer: {
    type: Boolean,
    default: true
  },
  clickOutsideClose: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["copy"])
const handelCopy = () => {
  emit("copy")
}
const transition = computed(() => {
  return props.direction === "top" ? "fadeDown" :
      props.direction === "bottom" ? "fadeUp" :
          props.direction === "left" ? "fadeLeft" :
              props.direction === "right" ? "fadeRight" : "fadeUp"
})
const modalStyle = computed(() => {
  return {
    background: props.bgColor,
    width: props.width,
    left: props.direction === "left" ? 0 : "auto",
    right: props.direction === "right" ? 0 : "auto"
  }
})
const modalRef = ref()
onClickOutside(modalRef, () => {
  if (props.clickOutsideClose) {
    visible.value = false
  }
})
</script>

<template>
  <teleport to="body">
    <transition :name="transition">
      <div
          ref="modalRef"
          class="modal"
          :style="modalStyle"
          v-if="visible"
      >
        <div class="modal-header">
          <div class="modal-close"
               @mouseenter="cursorState.setCursor('mini','')"
               @mouseleave="cursorState.setCursor('default')"
               @click="visible = false"
          >
            <span>×</span>
          </div>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="footer">
          <!--          <p-button-->
          <!--              text="关闭"-->
          <!--              direction="bottom"-->
          <!--              @mouseenter="cursorState.setCursor('mini','')"-->
          <!--              @mouseleave="cursorState.setCursor('default')"-->
          <!--              @click="visible = false"-->
          <!--          />-->
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
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: rgba(255, 255, 255, .5);
  backdrop-filter: saturate(120%) blur(10px);

  .modal-header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;


    .modal-close {
      width: 32px;
      height: 32px;
      border-radius: 20px;
      color: $color-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
      transition: all ease-in .3s;
      z-index: 999;

      &:hover {
        background: $color-red;
        color: #fff;
      }
    }
  }

  .modal-content {
    width: 100%;
    height: 100%;
    padding: 16px 0;
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