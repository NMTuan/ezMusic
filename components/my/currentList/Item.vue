<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-14 15:24:24
 * @LastEditTime: 2022-08-14 15:24:39
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\currentList\Item.vue
-->
<template>
    <div class="flex text-sm py-1 px-2
    " :class="useClass" @dblclick="handleDblckick">
        <div>{{ item.song_id.title }}</div>
        <div>
            <NuxtLink :to="{ name: 'album-id', params: { id: item.song_id.album.id } }" class="flex items-center ml-1 no-underline text-sky-600
                hover:op-75
                ">
                <div class="i-ri-hashtag"></div>
                {{ item.song_id.album.title }}
            </NuxtLink>
        </div>
        <div>
            <NuxtLink :to="{ name: 'artist-id', params: { id: item.song_id.album.artist.id } }" class="flex items-center ml-1 no-underline text-violet-600
                hover:op-75
                ">
                <div class="i-ri-at-line"></div>
                {{ item.song_id.album.artist.title }}
            </NuxtLink>
        </div>
        <!-- <div>{{ item.song_id.file.filename_disk }}</div> -->
        <!-- <pre>{{ item }}</pre> -->
    </div>
</template>
<script setup>
const player = usePlayer()
const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})

const handleDblckick = () => {
    // console.log(player)
    player.play(props.item.song_id.id)
    // player.el.src = config.public.minioUrl + props.item.song_id.file.filename_disk
    // player.el.play()
}

const useClass = computed(() => {
    const className = []
    if (player.currentId === props.item.song_id.id) {
        className.push('bg-neutral-200')
        className.push('hover:bg-neutral-200')
    } else {
        className.push('hover:bg-neutral-100')
    }
    return className
})
</script>
