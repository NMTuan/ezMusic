/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-08-14 10:57:25
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\nuxt.config.ts
 */
import { defineNuxtConfig } from 'nuxt'
import transformerDirective from '@unocss/transformer-directives'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    css: [`@/node_modules/normalize.css/normalize.css`],
    modules: [
        '@unocss/nuxt',
        '@intlify/nuxt3',
        '@nuxtjs/color-mode',
        '@pinia/nuxt'
    ],
    unocss: {
        // presets
        uno: true, // enabled `@unocss/preset-uno`
        icons: true, // enabled `@unocss/preset-icons`
        attributify: true, // enabled `@unocss/preset-attributify`,
        transformers: [transformerDirective()],
        shortcuts: [],
        rules: [],
        safelist: []
    },
    intlify: {
        localeDir: 'locales',
        vueI18n: {
            locale: 'zh-CN',
            fallbackLocale: 'zh-CN'
        }
    },
    colorMode: {
        classSuffix: ''
    },
    runtimeConfig: {
        public: {
            apiUrl: '', // 接口url
            storageUrl: '' // 文件服务器url前缀
        }
    }
})
