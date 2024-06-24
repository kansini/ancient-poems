<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getList} from "@/api/getList";
import {IPoetry} from "@/type";
import PoetryItem from "@/components/PoetryItem.vue";
import {useRouter} from "vue-router";
import {useCursorStore} from "@/store";
import PoemList from "@/components/PoemList.vue";
import CoverTitle from "@/components/Title.vue";

const cursorState = useCursorStore();

const router = useRouter();
const back = () => {
  current.value = -1;
  showPoetryList.value = false;
}
const current = ref(-1)

const setCursor = (type: string) => {
  cursorState.setCursor(type)
}
const handleMouseEnter = () => {
  setCursor("middle")
}
const handleMouseLeave = () => {
  setCursor("default")
}
const poetryList = reactive<IPoetry[]>([])
const getPoetryList = async () => {
  getList("poetry.json").then((res: any) => {
    Object.assign(poetryList, res.data)
  })
}
const showPoetryList = ref(false)
const poetryName = ref("")
const onClickItem = (data: IPoetry) => {
  current.value = data.id
  showPoetryList.value = true
  poetryName.value = data.name
}
onMounted(() => {
  getPoetryList()
})
</script>

<template>
  <div class="poetry-list">
    <div
        class="poetry-list-container"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
      <cover-title v-if="current === -1" @click="router.push('/')"/>
      <div class="poetry-list-content">
        <template v-for="(poetry,index) in poetryList">
          <poetry-item
              v-if="current === -1 || current === index"
              :active="current === index"
              :data="poetry"
              :delay="200 * index"
              @click="onClickItem"
          />
        </template>
      </div>
    </div>
    <poem-list
        @back="back"
        :name="poetryName"
        v-model:show="showPoetryList"
    />
  </div>

</template>

<style scoped lang="scss">
.poetry-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;

  .poetry-list-container {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 80px;

    .poetry-list-content {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-evenly;
      width: 70%;
      gap: 24px;
      flex-wrap: wrap;
    }
  }

}

</style>