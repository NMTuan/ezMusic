<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-08-07 18:14:40
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\index.vue
-->
<template>
    <div>
        <div>total: {{ meta.total_count }}</div>
        <SongListItem v-for="(song, index) in songList" class="flex items-center p-2" :song="song" :index="index + 1">
        </SongListItem>
        <Player />
        <!-- <pre>{{ songList }}</pre> -->
    </div>
</template>
<script lang="ts" setup>
const api = useApi()
const songList = ref([])
const total = ref(0)

const res = await api.song.fetch({
    fields: [
        // 'id',
        'title',
        'album.title',
        'album.artist.title',
        'file.filename_disk'
    ]
})

if (res.error.value) {
    console.log('[error]', res.error.value, res.error)
}

const { meta, data } = unref(res.data)
songList.value = data
</script>
