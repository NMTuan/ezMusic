/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-10 11:50:18
 * @LastEditTime: 2022-08-10 14:15:58
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\middleware\check.global.ts
 */
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('[middleware] toName:', to.name)
    console.log('[middleware] formName:', from.name)
    const apiUrlPrefix = useCookie('apiUrlPrefix').value || ''
    const storageUrlPrefix = useCookie('storageUrlPrefix').value || ''
    if (to.name !== 'index') {
        if (apiUrlPrefix === '' || storageUrlPrefix === '') {
            return navigateTo({ name: 'index' })
        }
    }
})
