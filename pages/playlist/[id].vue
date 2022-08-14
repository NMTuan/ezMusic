<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 21:09:38
 * @LastEditTime: 2022-08-14 15:29:34
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\[id].vue
-->
<template>
    <div class="flex flex-col flex-1 overflow-hidden relative m-1 rounded bg-white">
        <div>
            共 {{ meta.filter_count }} 首歌曲
            <button @click="playAll">播放所有歌曲</button>
        </div>
        <div class="flex-1 overflow-hidden">
            <MyLoading v-if="loading" />
            <Simplebar v-else>
                <MyPlayListItem v-for='item in list' :item='item' />
            </Simplebar>
        </div>
    </div>
</template>
<script setup>
const api = useApi()
const route = useRoute()
const player = usePlayer()
const loading = ref(false)
const meta = ref({})
const list = ref([])

const fetch = (id) => {
    const res = api.playlist_song.fetch(id)
    watchEffect(() => {
        loading.value = res.pending.value
    })
    watch(res.data, (data) => {
        meta.value = data.meta
        list.value = data.data
    })
}

const playAll = () => {
    player.list = list.value
    player.randomPlay()
}

onMounted(() => {
    if (route.params.id) {
        fetch(route.params.id)
    }
})

</script>
