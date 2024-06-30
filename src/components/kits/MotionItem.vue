<script setup lang="ts">
import userMotion from "@/hooks/useMotion";

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: "fadeIn"
  }
})
const {initial, enter} = (userMotion() as any)[props.type];

</script>

<template>
  <div
      v-motion
      :initial="initial"
      :enter="enter"
      :delay="delay"
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss">

</style>