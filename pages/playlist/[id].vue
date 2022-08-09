<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 21:09:38
 * @LastEditTime: 2022-08-09 15:35:43
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\[id].vue
-->
<template>
    <div>
        <ClientOnly>
            <pre>{{ meta }}</pre>
        </ClientOnly>
        <PlayListItem v-for='item in player.list' :item='item' />
    </div>
</template>
<script setup>
const api = useApi()
const route = useRoute()
const player = usePlayer()
const meta = ref({})
const list = ref([])

const fetch = async (id) => {
    const res = await api.playlist_song.fetch(id)
    if (res.error.value !== null) {
        return
    }
    const data = unref(res.data)
    meta.value = data.meta
    list.value = data.data
    player.list = data.data
}

if (route.params.id) {
    fetch(route.params.id)
}
</script>
