<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-09 11:24:15
 * @LastEditTime: 2022-09-26 13:53:47
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\configure.vue
-->
<template>
    <div class="pt-0 px-4 pb-4 overflow-hidden">
        <div class="leading-6 text-sm">
            <p>
                本项目为纯静态的前端项目，不涉及任何音频资源的存储与分发。
                如有侵权或不当之处请与
                <a class="text-violet-100" hover=" opacity-75" href="https://github.com/NMTuan" target="_blank">我</a>
                联系。
            </p>
            <p>
                本项目基于 MIT
                协议完全
                <a class="text-violet-100" hover=" opacity-75" href="https://github.com/NMTuan/ezMusic"
                    target="_blank">开源</a>，
                你可以对源码做任意修改与使用，由此产生的法律问题本站及本项目原作者概不负责。
            </p>
            <p>
                后端服务需自行搭建，教程详见
                <a class="text-violet-100" hover=" opacity-75" href="https://www.muyi.dev/ezmusic/"
                    target="_blank">此处</a>
                。请确保拥有版权。
            </p>
            <p>请填写并保存以下两个配置信息，聆听自己的数字音频。</p>
            <p>
                <input type="text" class="w-full px-4 py-2 
                bg-violet-200 
                text-violet-800 leading-none
                border-none rounded outline-none
                focus:border-violet-500" v-model="config.apiUrl" placeholder="API URL" />
            </p>
            <p>
                <input type="text" class="w-full px-4 py-2 
                bg-violet-200 
                text-violet-800 leading-none
                border-none rounded outline-none
                focus:border-violet-500" v-model="config.storageUrl" placeholder="STORAGE URL" />
            </p>
            <p class="text-sm text-white/30">
                注：此信息仅存于当前浏览器，默认保存30天。
            </p>
        </div>
        <div class="flex flex-row-reverse">
            <div @click="submit" class="
                    w-16 text-center cursor-pointer px-4 py-2 rounded ml-2 transition-all
                    bg-violet-500 text-white hover:bg-violet-400
                 ">
                <div v-if="loading" class="i-ri-loader-3-line text-lg animate-spin mx-auto"></div>
                <div v-else>保存</div>
            </div>
            <div @click="cancel" class="
                    w-16 text-center cursor-pointer px-4 py-2 rounded ml-2 transition-all
                    text-violet-300 hover:bg-violet-500/50 hover:text-violet-100
                 ">
                取消
            </div>
        </div>
    </div>
</template>
<script setup>
const config = useConfig()
const loading = ref(false)
const router = useRouter()
const submit = () => {
    if (loading.value) {
        return
    }
    if (!config.perfected) {
        alert('请先完善配置项')
        return
    }
    loading.value = true
    location.href = location.origin
}
const cancel = () => {
    router.back()
}
</script>
