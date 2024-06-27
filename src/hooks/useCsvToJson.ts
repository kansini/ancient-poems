import {ref} from "vue";
import Papa from "papaparse";
import $http from "@/api";
import {IPoemByDynasty} from "@/type"


export function useCsvToJson() {
    const jsonData = ref<IPoemByDynasty[]>([{
        "title": "",
        "dynasty": "",
        "author": "",
        "content": ""
    }]);
    const loading = ref(false);

    async function getJsonData(fileName: string, currentPage: number = 1, pageSize: number = 10) {
        try {
            loading.value = true;
            const response = await $http.get(`csv/${fileName}.csv`);
            const text = response.data;
            const parsedData = Papa.parse(text, {header: true}).data;

            // 计算分页数据
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            jsonData.value = parsedData.slice(startIndex, endIndex) as IPoemByDynasty[];
        } catch (err) {
            console.error("Error fetching and parsing CSV data:", err);
        } finally {
            loading.value = false;
        }
    }


    return {jsonData, loading, getJsonData};
}
