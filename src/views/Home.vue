<script setup lang="ts">
import CoverTitle from "@/components/Title.vue"
</script>

<template>
  <div class="home">
    <cover-title/>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-light;
  background-size: auto 60%;
}

</style>