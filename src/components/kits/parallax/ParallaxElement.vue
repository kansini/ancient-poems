<template>
  <component :is="tag" :style="{...transform, ...transformParameters}">
    <slot></slot>
  </component>
</template>
<script lang="ts" setup>
import {computed, inject} from "vue";

const mousePosition = inject("mousePosition") as any;
const isHovering = inject("isHovering") as any;
const shape = inject("shape") as any;
const easing = inject("easing") as any;
const animationDuration = inject("animationDuration") as any;
const didEnter = inject("didEnter");

const props = defineProps({
  parallaxStrength: {
    type: Number,
    default: 10,
  },
  type: {
    type: String,
    default: "translation", // 'rotation','depth'
  },
  tag: {
    type: String,
    default: "div",
  },
  limitX: {
    type: Boolean,
    default: false,
  },
  limitY: {
    type: Boolean,
    default: false,
  }
})
const transform = computed(() => {
  if (!isHovering) return;
  const parallaxStrength = props.type === "depth" ? Math.abs(props.parallaxStrength) : props.parallaxStrength;
  const relativeX = mousePosition.x - shape.left;
  const relativeY = mousePosition.y - shape.top;
  const movementX = ((relativeX - shape.width / 2) / (shape.width / 2)) * parallaxStrength;
  const movementY = ((relativeY - shape.height / 2) / (shape.height / 2)) * parallaxStrength;
  let transform;
  if (props.type === "translation") {
    transform = `translate3d(${props.limitY ? 0 : -movementX}px, ${props.limitX ? 0 : -movementY}px, 0)`;
  } else if (props.type === "rotation") {
    let movement;
    if (props.limitX) {
      movement = movementX * 2;
    } else if (props.limitY) {
      movement = movementY * 2;
    } else {
      movement = movementX + movementY;
    }
    transform = `rotate3d(0,0,1,${movement}deg)`;
  } else if (props.type === "depth") {
    transform = `rotateX(${props.limitX ? 0 : -movementY}deg) rotateY(${props.limitY ? 0 : movementX}deg) translate3d(0,0,${props.parallaxStrength * 2}px)`;
  }
  return {transform};
})
const transformParameters = computed(() => {
  return {
    transitionProperty: "transform",
    transitionDuration: transitionDuration,
    transformOrigin: "center",
    transitionTimingFunction: transitionTimingFunction,
  };
})
const transitionDuration = computed(() => {
  const durationException = animationDuration > 400 ? animationDuration : 400;
  const duration = didEnter ? animationDuration : durationException;
  return `${duration}ms`;
})
const transitionTimingFunction = computed(() => {
  return easing;
})

</script>
