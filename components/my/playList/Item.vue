<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-09 11:49:22
 * @LastEditTime: 2022-09-19 14:57:58
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\playList\Item.vue
-->
<template>
    <div class="
    flex
    py-1 px-2
    text-sm 
    transition-all
    group
    hover:bg-black/15
    ">
        <div class="
        flex mr-3
        overflow-hidden
        group-hover:text-white
        ">
            <div class="truncate" :title="item.title">{{ item.title }}</div>
        </div>
        <!-- 专辑 -->
        <div class="flex items-center mr-3 cursor-pointer 
        text-violet-500 overflow-hidden
        group-hover:text-violet-300">
            <div class="flex-shrink-0 i-ri-hashtag mr-1"></div>
            <div class="truncate" :title="item?.album?.title">{{ item?.album?.title }}</div>
        </div>
        <!-- 歌手 -->
        <div class="flex items-center mr-3 cursor-pointer 
        text-violet-500 overflow-hidden
        group-hover:text-violet-300">
            <div class="flex-shrink-0 i-ri-at-line mr-1"></div>
            <div class="truncate" :title="item?.album?.artist?.title">{{ item?.album?.artist?.title }}</div>
        </div>

        <!-- <div>
            <NuxtLink :to="{ name: 'album-id', params: { id: item.song_id.album.id } }" class="flex items-center ml-1 no-underline text-sky-600
                hover:op-75
                ">
                <div class="i-ri-hashtag"></div>
                {{ item.song_id.album.title }}
            </NuxtLink>
        </div> -->
        <!-- <div>
            <NuxtLink :to="{ name: 'artist-id', params: { id: item.song_id.album.artist.id } }" class="flex items-center ml-1 no-underline text-violet-600
                hover:op-75
                ">
                <div class="i-ri-at-line"></div>
                {{ item.song_id.album.artist.title }}
            </NuxtLink>
        </div> -->
        <!-- <div>{{ item.song_id.file.filename_disk }}</div> -->
        <!-- <pre>{{ item }}</pre> -->
    </div>
</template>
<script setup>
// const player = usePlayer()
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})

// const handleDblckick = () => {
//     // console.log(player)
//     player.play(props.item.song_id.id)
//     // player.el.src = config.public.minioUrl + props.item.song_id.file.filename_disk
//     // player.el.play()
// }

// const useClass = computed(() => {
//     const className = []
//     if (player.currentId === props.item.song_id.id) {
//         className.push('bg-neutral-200')
//         className.push('hover:bg-neutral-200')
//     } else {
//         className.push('hover:bg-neutral-100')
//     }
//     return className
// })
</script>
