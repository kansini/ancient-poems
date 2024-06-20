<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {getList} from "@/api/getList.ts";
import {IPoetry} from "@/type";
import PoetryItem from "@/components/PoetryItem.vue";
import userMotion from "@/hooks/useMotion";
import {useRouter} from "vue-router";
import PButton from "@/components/kits/Button.vue";
import {useCursorStore} from "@/store";

const cursorState = useCursorStore();

const router = useRouter();
const back = () => {
  router.push("/")
}

const {motionOption} = userMotion();

const poetryList = reactive<IPoetry[]>([])
const getPoetryList = async () => {
  getList("poetry.json").then((res: any) => {
    Object.assign(poetryList, res.data)
  })
}
onMounted(() => {
  getPoetryList()
})
</script>

<template>
  <div class="poetry-list">
    <div class="poetry-list-content"
         @mouseenter="cursorState.setCursor('middle')"
         @mouseleave="cursorState.setCursor('default')"
    >
      <poetry-item
          v-for="(poetry,index) in poetryList"
          :data="poetry"
          v-motion
          :initial="motionOption.initial"
          :enter="motionOption.enter"
          :delay="20 + 200 * index"
      />
    </div>
    <p-button
        @click="back"
        text="返回"
        @mouseenter="cursorState.setCursor('mini')"
        @mouseleave="cursorState.setCursor('default')"
    />
  </div>
</template>

<style scoped lang="scss">
.poetry-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  .poetry-list-content {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 80px;
  }
}

</style>