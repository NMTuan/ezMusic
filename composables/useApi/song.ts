/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-18 22:31:07
 * @LastEditTime: 2022-09-16 15:29:42
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\useApi\song.ts
 */
export default {
    fetch: (params) => {
        return useApiFetch('/items/song', {
            method: 'get',
            params: {
                ...params,
                meta: '*'
            }
        })
    }
}
