<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 20:57:11
 * @LastEditTime: 2022-08-14 19:16:29
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\playList\index.vue
-->
<template>
    <div class="playlistTitle flex">
        <NuxtLink :to="{ name: 'playlist' }" :class="{ 'playlistTitle__item--active': !route.params.id }"
            class="playlistTitle__item">播放列表
        </NuxtLink>
        <NuxtLink v-for='list in playlist' :to="{ name: 'playlist-id', params: { id: list.id } }"
            :class="{ 'playlistTitle__item--active': route.params.id === list.id }" class="playlistTitle__item">
            {{ list.title }}
        </NuxtLink>
    </div>
</template>
<script setup>
const route = useRoute()
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
<style lang="scss" scoped>
.playlistTitle {
    @apply flex justify-around bg-violet-100 text-base;

    &__item {
        @apply px-4 py-3 no-underline;

        &--active {
            @apply font-bold;
        }
    }
}
</style>
