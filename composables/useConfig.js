/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-14 11:55:55
 * @LastEditTime: 2022-09-14 15:48:22
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\useConfig.js
 */
import { defineStore } from 'pinia'

const httpReg = new RegExp(/^https?\:\/\/.*$/, 'i')

const apiUrl = useCookie('apiUrl', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})
const storageUrl = useCookie('storageUrl', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})

export default () => {
    const config = useRuntimeConfig()
    if (!apiUrl.value && config.public.apiUrl) {
        apiUrl.value = config.public.apiUrl
    }
    if (!storageUrl.value && config.public.storageUrl) {
        storageUrl.value = config.public.storageUrl
    }

    const store = defineStore('config', {
        state: () => {
            return {
                apiUrl, // 接口地址
                storageUrl // 对象存储地址
            }
        },
        getters: {
            // 已完善配置项
            perfected(state) {
                return (
                    httpReg.test(state.apiUrl) && httpReg.test(state.storageUrl)
                )
            }
        }
    })

    return store()
}
