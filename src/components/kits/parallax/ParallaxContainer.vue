<template>
  <component
      ref="el"
      :is="tag"
      @mousemove="getMousePosition"
      @mouseleave="parallaxStop"
      @mouseenter="parallaxStart"
      :style="{perspective: `${perspective}px`}"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import {provide, reactive, ref} from "vue";
import throttle from "./throttle";

const props = defineProps({
  animationDuration: {
    type: Number,
    default: 1000,
  },
  easing: {
    type: String,
    default: "cubic-bezier(0.23, 1, 0.32, 1)",
  },
  tag: {
    type: String,
    default: "div",
  },
  perspective: {
    type: Number,
    default: 1000,
  },
});
const mousePosition = reactive({
  x: 0,
  y: 0,
})
const el = ref(null);
const isHovering = ref(false);
const isHoverAble = ref(false);
const attemptedHover = ref(false);
const didEnter = ref(false);
const shape = ref(null);
provide("mousePosition", mousePosition);
provide("isHovering", isHovering.value);
provide("shape", shape.value);
provide("easing", props.easing);
provide("animationDuration", props.animationDuration);
provide("didEnter", didEnter.value);
const getMousePosition = () => {
  throttle(function (event) {
    shape.value = (el as any).getBoundingClientRect();
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  }, 100)
};
const parallaxStart = () => {
  attemptedHover.value = true;
  if (isHoverAble.value) {
    isHovering.value = true;
    didEnter.value = false;
    setTimeout(() => {
      didEnter.value = true;
    }, 1000);
  }
};
const parallaxStop = () => {
  isHovering.value = false;
  didEnter.value = false;
}
</script>
