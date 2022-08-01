<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:42:57
 * @LastEditTime: 2022-08-01 20:45:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\song\list\Item.vue
-->
<template>
    <div>
        <span class="w-12 text-center bg-sky-100">{{ index }}</span>
        {{ song.title }}[{{ song.album.title }}]@{{ song.album.artist.title }}
        <button class="ml-2">
            <div class="i-ri-play-line" @click="handleClick"></div>
        </button>
    </div>
</template>
<script setup>
const props = defineProps({
    index: {
        type: Number,
        default: 1
    },
    song: {
        type: Object,
        default: () => ({})
    }
})

const handleClick = () => {
    console.log(props.song.title)
}
</script>
