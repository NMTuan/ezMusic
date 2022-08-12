/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-19 16:07:49
 * @LastEditTime: 2022-08-11 22:13:02
 * @LastEditors: NMTuan
 * @Description: 异步处理配置
 * @FilePath: \ezMusic\composables\useApiFetch.ts
 */

export default (url, options) => {
    const apiUrl = useCookie('apiUrl')
    const params = {
        headers: {},
        baseURL: apiUrl.value,
        lazy: true,
        initialCache: false,
        // 拦截器 https://github.com/unjs/ohmyfetch#%EF%B8%8F-interceptors
        async onRequestError({ request, options, error }) {
            // Log error
            console.log('[apiFetch request error]', request, error.message)
            // alert(`[${error.message}] ${request}`)
        },
        async onResponseError({ request, response, options }) {
            // Log error
            console.log(
                '[apiFetch respone error]',
                response.status,
                response._data
            )
            // alert(JSON.stringify(response._data.errors, null, 2))
        }
    }

    return useFetch(url, {
        ...params,
        ...options
    })
}
