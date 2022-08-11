/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-10 11:50:18
 * @LastEditTime: 2022-08-11 22:18:08
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\middleware\check.global.ts
 */
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('[middleware] toName:', to.name)
    console.log('[middleware] formName:', from.name)
    const apiUrlPrefix = useCookie('apiUrlPrefix')
    const storageUrlPrefix = useCookie('storageUrlPrefix')
    const apiReg = /^http.*/.test(apiUrlPrefix.value)
    const storageReg = /^http.*/.test(storageUrlPrefix.value)
    if (to.name !== 'index') {
        if (!apiReg || !storageReg) {
            return navigateTo({ name: 'index' })
        }
        return
    }
    if (apiReg && storageReg) {
        return navigateTo({ name: 'playlist' })
    }
})
