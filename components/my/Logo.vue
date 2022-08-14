<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-13 20:13:44
 * @LastEditTime: 2022-08-14 10:24:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\Logo.vue
-->
<template>
    <div class="absolute top-50% left-50% -mt-32 -ml-32">
        <div
            class="flex flex-col items-center justify-center bg-violet-500 rounded shadow shadow-violet-400 w-64 h-64 duration-1000 cursor-pointer group">
            <div class="i-ri-play-circle-line text-32 text-white" :class="{ 'animate-spin': loading }"></div>
            <div class="text-4xl text-white font-900 text-shadow">
                ezMusic
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
