<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:42:57
 * @LastEditTime: 2022-08-01 21:23:54
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\song\list\Item.vue
-->
<template>
    <div>
        <span class="w-12 text-center bg-sky-100">{{ index }}</span>
        {{ song.title }}[{{ song.album.title }}]@{{ song.album.artist.title }}
        <button class="ml-2" @click="handleClick">
            <div class="i-ri-play-fill"></div>
        </button>
    </div>
</template>
<script setup>
const config = useRuntimeConfig()
const player = usePlayer()
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
    player.el.src = config.public.minioUrlPrefix + props.song.file.filename_disk
    player.el.play()
}
</script>
