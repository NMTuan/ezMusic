<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-11 20:04:03
 * @LastEditTime: 2022-09-19 14:33:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\index.vue
-->
<template>
    <div class="py-2">
        <div v-for="item in list">
            <!-- {{item.title}} -->
            <MyPlayListItem :item="item"></MyPlayListItem>
        </div>
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
