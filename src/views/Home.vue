<script setup lang="ts">
import {useRouter} from "vue-router";
import CoverTitle from "@/components/Title.vue";


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

.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>