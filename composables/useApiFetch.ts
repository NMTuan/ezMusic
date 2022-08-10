/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-19 16:07:49
 * @LastEditTime: 2022-08-10 14:45:44
 * @LastEditors: NMTuan
 * @Description: 异步处理配置
 * @FilePath: \ezMusic\composables\useApiFetch.ts
 */

export default async (url, options) => {
    const apiUrlPrefix = useCookie('apiUrlPrefix').value
    const params = {
        headers: {},
        baseURL: apiUrlPrefix,
        // 拦截器 https://github.com/unjs/ohmyfetch#%EF%B8%8F-interceptors
        async onRequestError({ request, options, error }) {
            // Log error
            console.log('[apiFetch request error]', request, error.message)
        },
        async onResponseError({ request, response, options }) {
            // Log error
            console.log(
                '[apiFetch respone error]',
                response.status,
                response._data
            )
        }
    }

    // 限定该请求的header中不带token
    // if (!options.noAuth && auth.access_token) {
    //     delete options.noAuth
    //     params.headers = {
    //         Authorization: `Bearer ${auth.access_token}`
    //     }
    // }

    // useFetch有参数缓存, 需换成useAsyncData
    // return useFetch(url, {
    //     ...params,
    //     ...options
    // })
    return useAsyncData(
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
