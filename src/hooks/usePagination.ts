import {ref} from "vue";
import {IPoem} from "@/type";

export default function () {
    const pageSize = ref(5);
    const current = ref(1);
    const totalPage = (totalList: IPoem[]) => {
        return Math.ceil(totalList.length / pageSize.value);
    }
    const list = (totalList: IPoem[]) => {
        // 总页数
        // 确保当前页数在有效范围内
        current.value = Math.min(Math.max(current.value, 1), totalPage(totalList));

        // 根据当前页数和每页大小计算起始索引和结束索引
        const startIndex = (current.value - 1) * pageSize.value;
        const endIndex = startIndex + pageSize.value;

        // 返回当前页的诗歌数据
        return totalList.slice(startIndex, endIndex);
    }
    return {
        pageSize,
        current,
        list,
        totalPage
    }
}