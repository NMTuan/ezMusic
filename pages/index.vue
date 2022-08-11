<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-08-11 17:46:59
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\index.vue
-->
<template>
    <div class="bg-violet-50 h-full flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center bg-violet-500 rounded shadow shadow-violet-400 w-64 h-64 duration-1000 cursor-pointer group"
            @click="clickLogo">
            <div class="i-ri-play-circle-line text-32 text-white animate-spin"></div>
            <div class="text-4xl text-white font-900 text-shadow">
                ezMusic
            </div>
        </div>
        <ConfigDialog v-model:show="show" title="注意事项">
            <div class="leading-6">
                <p>
                    本项目为纯静态的前端项目，不涉及任何音频资源的存储与分发。
                    如有侵权或不当之处请与
                    <a href="https://github.com/NMTuan" target="_blank" class="text-violet-500">我</a>
                    联系。
                </p>
                <p>
                    本项目基于 MIT 协议完全开源，你可以对源码做任意修改与使用，由此产生的法律问题本站及本项目原作者概不负责。
                    <a href="https://github.com/NMTuan/ezMusic" target="_blank">
                        <div class="i-ri-github-fill inline-block align-middle text-lg text-violet-500"></div>
                    </a>
                </p>
                <p>
                    后端服务需自行搭建，教程详见
                    <a href="#" target="_blank" class="text-violet-500">此处</a>
                    。请确保拥有版权。
                </p>
                <p>
                    请填写并保存以下两个配置信息，聆听自己的数字音频。
                </p>
                <p>
                    <input type="text" :class="inputClass" v-model="apiUrlPrefix" placeholder="API URL">
                </p>
                <p>
                    <input type="text" :class="inputClass" v-model="storageUrlPrefix" placeholder="STORAGE URL">
                </p>
            </div>
            <template #foot="{ close }">
                <div class="flex flex-row-reverse">
                    <div @click="submit" :class="btnClass" class="bg-violet-500 text-white
                    hover:bg-violet-600
                    ">保存</div>
                    <div @click="close" :class="btnClass" class="text-violet-500
                    hover:bg-neutral-100
                    ">取消</div>
                </div>
            </template>
        </ConfigDialog>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: 'page'
})

const apiUrlPrefix = useCookie('apiUrlPrefix', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})
const storageUrlPrefix = useCookie('storageUrlPrefix', {
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})
const show = ref(false)

watchEffect(() => {
    useCookie('apiUrlPrefix').value = apiUrlPrefix.value
})
watchEffect(() => {
    useCookie('storageUrlPrefix').value = storageUrlPrefix.value
})


const clickLogo = () => {
    const apiUrlPrefix = useCookie('apiUrlPrefix1')
    const storageUrlPrefix = useCookie('storageUrlPrefix1')
    if (apiUrlPrefix.value && storageUrlPrefix.value) {
        navigateTo({ name: 'playlist' })
    } else {
        show.value = true
    }
}

const inputClass = [
    'w-full',
    'px-4',
    'py-2',
    'border',
    'border-neutral-300',
    'rounded',
    'outline-none',
    'focus:border-violet-500'
]

const btnClass = [
    'cursor-pointer',
    'px-4',
    'py-2',
    'rounded',
    'ml-2',
    'transition-all'
]


const submit = () => {
    console.log('submit')
}

</script>
<style lang="scss" scoped>
a {
    @apply text-violet-500 bg-red;
}
</style>
