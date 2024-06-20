import $http from "./index";

// 定义查询参数类型
type QueryParams = {
  id?: string;
  title?: string;
  author?: string;
};

/**
 * 根据查询参数获取列表
 * @param {string} baseUrl - API的基础URL
 * @param {QueryParams} params - 查询参数对象
 * @returns Promise<any> - 包含查询结果的Promise
 */
const getList = (baseUrl: string, params: QueryParams = {}) => {
  // 构建查询字符串
  const queryParamsString = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // 将查询字符串附加到URL上
  const fullUrl = `${baseUrl}?${queryParamsString}`;

  // 发起GET请求
  return $http.get(fullUrl);
};

export { getList };
