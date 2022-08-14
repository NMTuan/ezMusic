/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-18 22:31:07
 * @LastEditTime: 2022-08-11 21:42:01
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\useApi\playlist.ts
 */
export default {
    fetch: (params) => {
        return useApiFetch('/items/playlist', {
            method: 'get',
            params: {
                ...params,
                meta: '*'
            }
        })
    }
}
