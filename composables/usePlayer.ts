/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:58:30
 * @LastEditTime: 2022-08-01 21:08:44
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\usePlayer.ts
 */
import { defineStore } from 'pinia'
const api = useApi()

export default defineStore('auth', {
    state: () => {
        return {
            el: null
        }
    },
    getters: {
        // 已登录?
        isLogged(state) {
            return 1
        }
    },
    actions: {
        // 登录
        // login(payload = {}) {
        //     return new Promise((resolve, reject) => {
        //         api.auth
        //             .login(payload)
        //             .then((res) => {
        //                 if (unref(res.error) !== null) {
        //                     reject(res)
        //                     return
        //                 }
        //                 const { data } = unref(res.data)
        //                 useCookie('access_token').value = data.access_token
        //                 useCookie('refresh_token').value = data.refresh_token
        //                 this.access_token = data.access_token
        //                 this.refresh_token = data.refresh_token
        //                 resolve(res)
        //             })
        //             .catch((error) => {
        //                 reject(error)
        //             })
        //     })
        // }
    }
})
