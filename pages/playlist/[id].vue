<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 21:09:38
 * @LastEditTime: 2022-08-14 14:21:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\[id].vue
-->
<template>
    <div>
        <div>
            共 {{ meta.filter_count }} 首歌曲
            <button @click="playAll">播放所有歌曲</button>
        </div>
        {{ loading }}
        <MyPlayListItem v-for='item in list' :item='item' />
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
