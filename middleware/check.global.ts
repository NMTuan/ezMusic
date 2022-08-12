/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-10 11:50:18
 * @LastEditTime: 2022-08-12 09:59:21
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\middleware\check.global.ts
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const api = useApi()
    // 非首页, 接口异常, 则跳回首页
    if (to.name !== 'index') {
        const res = await api.playlist.fetch()
        if (res.error.value !== null) {
            alert('接口异常, 请重新配置')
            return navigateTo({ name: 'index' })
        }
    }
})
