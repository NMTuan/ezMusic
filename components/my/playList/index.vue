<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 20:57:11
 * @LastEditTime: 2022-08-14 14:09:02
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\playList\index.vue
-->
<template>
    <div class="flex">
        {{ loading }}
        <NuxtLink :to="{ name: 'playlist' }">[播放列表]
        </NuxtLink>
        <NuxtLink v-for='list in playlist' :to="{ name: 'playlist-id', params: { id: list.id } }">
            [{{ list.title }}]
        </NuxtLink>
    </div>
</template>
<script setup>

const api = useApi()
const loading = ref(false)
const playlist = ref([])

// onMounted(() => {
const res = api.playlist.fetch({
    fields: [
        'id',
        'title',
        'count(song_id)'
    ]
})
watchEffect(() => {
    loading.value = res.pending.value
})
watch(res.data, (data) => {
    playlist.value = data.data
})
// })

</script>
