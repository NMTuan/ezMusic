<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-11 20:04:03
 * @LastEditTime: 2022-09-16 17:43:14
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\index.vue
-->
<template>
    <div class="
    flex-1 overflow-auto mt-2
    rounded
    bg-gradient-to-b from-violet-700 to-purple-900/50
    shadow-inner
    ">

        <!-- <div class="flex flex-col flex-1 overflow-hidden relative m-1 rounded bg-white">
        <div class="flex-1 overflow-hidden">
            <Simplebar>
                <MyCurrentListItem v-for="item in player.list" :item="item" />
            </Simplebar>
        </div>
    </div> -->
        <!-- <MyDialog> -->
        <Simplebar class="p-2">
            <div v-for="item in list">
                <!-- {{item.title}} -->
                <MyPlayListItem :item="item"></MyPlayListItem>
            </div>
        </Simplebar>
        <!-- </MyDialog> -->
    </div>
</template>
<script setup>
const api = useApi()
const list = ref([])    // 歌曲列表

const { data } = await api.song.fetch({
    limit: -1,
    fields: [
        'id',
        'title',
        'album.id',
        'album.title',
        'album.artist.id',
        'album.artist.title',
    ]

})
list.value = data.value.data
</script>
