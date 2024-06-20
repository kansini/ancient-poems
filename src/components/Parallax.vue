<script setup lang="ts">
import {computed, reactive, ref} from "vue"
import type {CSSProperties} from "vue"
import {useParallax} from "@vueuse/core"

const target = ref(null)
const parallax = reactive(useParallax(target))
const props = defineProps({
  depth: {
    type: Number,
    default: 10,
  },
  scale: {
    type: Number,
    default: 1,
  },
})
const targetStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "480px",
  transition: ".3s ease-out all",
}

const containerStyle: CSSProperties = {
  perspective: "200px",
}
const cardStyle = computed(() => ({
  height: "max-content",
  width: "max-content",
  transition: ".5s ease-out all",
  transform: `rotateX(${parallax.roll * 10}deg) rotateY(${parallax.tilt * props.depth}deg) scale(${props.scale})`,
}))
</script>

<template>
  <div ref="target" :style="targetStyle">
    <div :style="containerStyle">
      <div :style="cardStyle">
        <slot/>
      </div>
    </div>
  </div>
</template>