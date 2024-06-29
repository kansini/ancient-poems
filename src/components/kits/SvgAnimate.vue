<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "wave"
  },
  wrapperClass: {
    type: String,
    default: ""
  },
  wrapperStyle: {
    type: Object,
    default: () => {
    }
  },
})
const style = computed(() => {
  return {
    ...props.wrapperStyle,
    filter: `url(#${props.type})`
  }
})
</script>

<template>
  <div
      class="svg-animate-wrapper"
      :class="wrapperClass"
      :style="style"
  >
    <slot></slot>
  </div>
  <svg width="0">
    <filter id="wave" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="2" result="noise">
        <animate attributeName="baseFrequency"
                 from="0.01 0.01"
                 to="0.06 0.06"
                 dur="10s"
                 repeatCount="indefinite"
                 values="0.01 0.01; 0.06 0.06; 0.01 0.01"
                 keyTimes="0; 0.5; 1"
                 calcMode="linear"
                 keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
        />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" scale="10" in2=""/>
    </filter>
    <filter id="blur">
      <feGaussianBlur stdDeviation="0" result="blurOut">
        <animate
            attributeName="stdDeviation"
            from="5"
            to="0"
            dur="2s"
            repeatCount="indefinite"
            values="5; 0; 5"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1"
        />
      </feGaussianBlur>
    </filter>
    <filter id="flood">
      <feFlood flood-color="blue" flood-opacity="1">
        <animate attributeName="flood-color"
                 values="blue;green;red;blue"
                 dur="4s"
                 repeatCount="indefinite"/>
        <animate attributeName="flood-opacity"
                 from="1"
                 to="0"
                 dur="2s"
                 repeatCount="indefinite"
                 begin="0.5s"/>
      </feFlood>
    </filter>
    <filter id="matrix">
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0">
        <animate attributeName="values"
                 from="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
                 to="0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0"
                 dur="2s"
                 repeatCount="indefinite"/>
      </feColorMatrix>
    </filter>
    <filter id="morph">
      <feMorphology operator="dilate" radius="1">
        <animate attributeName="radius"
                 from="1"
                 to="5"
                 dur="2s"
                 repeatCount="indefinite"/>
      </feMorphology>
    </filter>
    <filter id="convolveMatrix">
      <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" edgeMode="duplicate" order="">
        <animate attributeName="kernelMatrix"
                 values="0 -1 0 -1 5 -1 0 -1 0; 0 1 0 1 -4 1 0 1 0"
                 dur="4s"
                 repeatCount="indefinite"
                 keyTimes="0;1"/>
      </feConvolveMatrix>
    </filter>
    <defs>
      <filter id="lighting">
        <!-- 定义一个扩散光照滤镜 -->
        <feDiffuseLighting in="SourceGraphic" surfaceScale="5" diffuseConstant="1" lighting-color="white">
          <!-- 使用远光源，并通过animate动画改变光源位置 -->
          <feDistantLight azimuth="45" elevation="45">
            <animate attributeName="azimuth" from="45" to="315" dur="5s" repeatCount="indefinite"/>
            <animate attributeName="elevation" from="45" to="60" dur="5s" repeatCount="indefinite"/>
          </feDistantLight>
        </feDiffuseLighting>
      </filter>
    </defs>
  </svg>
</template>

<style scoped lang="scss">
.svg-animate-wrapper {
  &:hover {
    filter: none !important;
  }
}

</style>