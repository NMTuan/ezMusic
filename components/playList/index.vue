<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 20:57:11
 * @LastEditTime: 2022-08-08 21:20:13
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\playList\index.vue
-->
<template>
    <div class="flex">
        <NuxtLink v-for='list in playlist' :to="{ name: 'playlist-id', params: { id: list.id } }">
            [{{ list.title }}]
        </NuxtLink>
    </div>
</template>
<script setup>
const api = useApi()
const res = await api.playlist.fetch({
    fields: [
        'id',
        'title'
    ]
})
const playlist = ref([])
if (res.error.value === null) {
    const data = unref(res.data)
    playlist.value = data.data
}
</script>
