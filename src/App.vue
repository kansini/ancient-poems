<script setup lang="ts">
import Cursor from "@/components/kits/CustomCursor.vue";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore();

</script>

<template>
  <cursor :size="cursorState.size" :inner-text="cursorState.text"/>
  <router-view @mouseenter="cursorState.setCursor('default')"/>
</template>

<style lang="scss">
#app {
  font-family: "nanyongmingti", serif;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $color-light;
  padding: 0 16px;
}
</style>
