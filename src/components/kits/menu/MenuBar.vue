<script setup lang="ts">
import GithubIcon from "./GithubIcon.vue";
import FullscreenTrigger from "./FullscreenTrigger.vue";
import PAudio from "./Audio.vue";
// import PInfo from "./Info.vue";
import {useFullScreenStore} from "@/store";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore();
const setCursor = (size: string, text: string) => {
  cursorState.setCursor(size, text)
}


const emit = defineEmits(["mouseenter", "clickItem"])
const fullScreenStore = useFullScreenStore()
const onMouseenter = (name: string) => {
  console.log(name)
  setCursor("small", name)
  emit("mouseenter", name)
}
const onMouseenterAni = (name: string) => {
  onMouseenter(name)
}

</script>

<template>
  <div class="bav-bar">
    <!--    <div class="icon-container">-->
    <!--      <P-info @mouseenter="onMouseenter('言')"/>-->
    <!--    </div>-->
    <div class="icon-container">
      <fullscreen-trigger @mouseenter="onMouseenter(fullScreenStore.isFullScreen ?'退':'全')"/>
    </div>
    <div class="icon-container">
      <github-icon @mouseenter="onMouseenter('庫')"/>
    </div>
    <div class="icon-container">
      <p-audio @mouseenter="onMouseenterAni"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bav-bar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .icon-container {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>