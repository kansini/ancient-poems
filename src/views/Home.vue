<script setup lang="ts">
import CoverTitle from "@/components/Title.vue";
import userMotion from "@/hooks/useMotion";
import {useRouter} from "vue-router";

const router = useRouter();
const {motionOption} = userMotion();
const handleEnter = () => {
  router.push("/poetry")
}
</script>

<template>
  <div class="home">
    <cover-title
        @click="handleEnter"
        v-motion
        :initial="motionOption.initial"
        :enter="motionOption.enter"
    />
  </div>
</template>
<style lang="scss" scoped>


</style>