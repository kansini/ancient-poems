<script setup lang="ts">
import CoverTitle from "@/components/Title.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const handleEnter = () => {
  router.push("/poetry")
}
</script>

<template>
  <div class="home">
    <cover-title @click="handleEnter"/>
  </div>
</template>
<style lang="scss" scoped>


</style>