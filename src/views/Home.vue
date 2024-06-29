<script setup lang="ts">
import {useRouter} from "vue-router";
import CoverTitle from "@/components/Title.vue";
import SvgAnimate from "@/components/kits/SvgAnimate.vue"


const router = useRouter();
const handleEnter = () => {
  router.push("/poetry")
}

</script>

<template>
  <div class="home">
    <svg-animate>
      <cover-title @click="handleEnter"/>
    </svg-animate>
  </div>
</template>
<style lang="scss" scoped>

.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>