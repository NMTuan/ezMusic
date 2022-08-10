<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-08 20:57:11
 * @LastEditTime: 2022-08-10 17:35:29
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\playList\index.vue
-->
<template>
    <div class="flex" :class="useClass">
        <NuxtLink :to="{ name: 'playlist' }" :class="route.name === 'playlist' ? activeClass : inactiveClass">[播放列表]
        </NuxtLink>
        <NuxtLink v-for='list in playlist' :to="{ name: 'playlist-id', params: { id: list.id } }"
            :class="route.params.id === list.id ? activeClass : inactiveClass">
            [{{ list.title }}]
        </NuxtLink>
    </div>
</template>
<script setup>
const route = useRoute()
const api = useApi()
const playlist = ref([])

const useClass = computed(() => {
    const className = []
    className.push('py-4')
    return className
})
const itemClass = [
    'flex-1',
    'text-center',
    'no-underline'
]
const inactiveClass = computed(() => {
    const className = [...itemClass]
    className.push('text-sky-800')
    return className
})
const activeClass = computed(() => {
    const className = [...itemClass]
    className.push('text-sky-500')
    return className
})

const res = await api.playlist.fetch({
    fields: [
        'id',
        'title',
        'count(song_id)'
    ]
})
if (res.error.value === null) {
    const data = unref(res.data)
    playlist.value = data.data
}

</script>
