<script setup lang="ts">
import Cursor from "@/components/kits/CustomCursor.vue";
import {useCursorStore} from "@/store";
import MenuBar from "@/components/kits/menu/MenuBar.vue";

const cursorState = useCursorStore();

</script>

<template>
  <menu-bar/>
  <cursor :size="cursorState.size" :inner-text="cursorState.text"/>
  <router-view/>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
  background: $color-bg;
  padding: 0 16px;
  overflow: auto;
}
</style>
