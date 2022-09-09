<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-08 11:01:05
 * @LastEditTime: 2022-09-09 16:18:57
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\player\test.vue
-->
<template>
    <div>
        <div>loading: {{loading}}</div>
        <div>当前播放歌单: {{activeList.title }} </div>
        <div>歌曲数量: {{total}}</div>
        <div @click="clickPlay">[点击播放]</div>
        <pre>当前歌曲: {{activeSong}}</pre>
        <div>播放模式: {{activeMode.label}} </div>
        <audio src="" controls ref="audio"></audio>
    </div>
</template>

<script setup>
const api = useApi()
const apiUrl = useCookie('apiUrl')
const storageUrl = useCookie('storageUrl')
const loading = ref(false)  // 加载中
const activeList = ref({ id: 0, title: '全部歌曲' }) // 当前播放歌单
const total = ref(0)    // 歌单歌曲数量
const mode = ref([// 播放模式
    { label: '随机播放', value: 'shuffle', active: true },
    { label: '列表循环', value: 'loop' },
    { label: '单曲循环', value: 'one' }
])
const activeMode = computed(() => {
    return mode.value.find(item => item.active)
})    //当前播放模式
const activeSong = ref({})  // 当前歌曲
const audio = ref(null)

// 已配置
const configured = computed(() => {
    return (apiUrl.value && storageUrl.value) ? true : false
})

// 找 active 的歌单
const fetchActiveList = () => {
    const { data, error, pending, refresh } = api.playlist.fetch({
        'filter[active]': true,
        'fields': ['id', 'title', 'count(song_id)'],
    })

    watchEffect(() => {
        loading.value = pending
    })

    watch(data, (val) => {
        if (val.data.length > 0) {
            // 如果有 active 歌单
            activeList.value = {
                id: val.data[0].id,
                title: val.data[0].title
            }
            total.value = val.data[0].song_id_count
        } else {
            // 否则取所有歌曲数量
            fetchALlSong()
        }
    })
}

// 取歌曲总数
const fetchALlSong = () => {
    const { data, error, pending, refresh } = api.song.fetch({
        limit: 0,
        meta: '*'
    })

    watchEffect(() => {
        loading.value = pending
    })

    watch(data, (val) => {
        total.value = val.meta.total_count
    })

}

// 随机数 res >= min ; res < max; 
const random = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min
}

// 读取下一首
const fetchNextSong = () => {
    let offset = 0
    // 单曲循环
    // 如果没有当前歌曲, 则走后面流程取第一首歌曲, 否则直接播放当前歌曲
    if (activeSong.value.id !== undefined && activeMode.value.value === 'one') {
        audio.value.play()
        return
    }

    // 循环播放
    // 如果没有当前歌曲, 则走后面流程取第一首歌曲, 否则去下一首
    if (activeSong.value.id !== undefined && activeMode.value.value === 'loop') {
        offset = activeSong.value.index + 1
        if (offset > total.value) {
            offset = 0
        }
    }

    // 随机播放
    // 直接随机取一首
    if (activeMode.value.value === 'shuffle') {
        offset = random(total.value)
    }

    const { data } = api.song.fetch({
        offset,
        limit: 1,
        fields: [
            'id',
            'title',
            // 'album.*',
            'album.id',
            'album.title',
            // 'album.artist.*',
            'album.artist.id',
            'album.artist.title',
            // 'file.*',
            'file.type',
            'file.filename_disk',
        ]
    })

    watch(data, (val) => {
        activeSong.value = val.data[0]
        activeSong.value.index = offset
        audio.value.src =
            storageUrl.value + activeSong.value.file.filename_disk
        audio.value.play()
    })
}

// 点击播放按钮
const clickPlay = () => {
    // 判断配置
    if (!configured.value) {
        navigateTo({ name: 'configure' })
        return
    }

    // 没有歌曲信息
    if (activeSong.value.id === undefined) {
        fetchNextSong()
        return
    }

    // 如果暂停, 则继续播放
    if (audio.value.paused) {
        audio.value.play()
        return
    }

    // 如果正在播放, 则暂停
    audio.value.pause()
}



onMounted(() => {
    if (configured.value) {
        fetchActiveList()   // 获取 当前播放歌单
        // 播放结束
        audio.value.addEventListener('ended', () => {
            // 随机播放下一首
            fetchNextSong()
        })
    }
})


</script>
