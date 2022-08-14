/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-19 16:07:49
 * @LastEditTime: 2022-08-14 14:20:28
 * @LastEditors: NMTuan
 * @Description: 异步处理配置
 * @FilePath: \ezMusic\composables\useApiFetch.ts
 */

export default (url, options) => {
    const apiUrl = useCookie('apiUrl')
    const params = {
        // headers: {},
        baseURL: apiUrl.value,
        // 拦截器 https://github.com/unjs/ohmyfetch#%EF%B8%8F-interceptors
        async onRequestError({ request, options, error }) {
            console.log('[apiFetch request error]', request, error.message)
        },
        async onResponseError({ request, response, options }) {
            console.log(
                '[apiFetch respone error]',
                response.status,
                response._data
            )
        }
    }
    return useLazyAsyncData(
        url,
        () =>
            $fetch(url, {
                ...params,
                ...options
            }),
        {
            initialCache: false // 禁止参数缓存, 默认开启. 开启时, 相同参数的请求不会发第二次.
        }
    )
}
