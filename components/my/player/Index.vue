<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-09-08 11:01:05
 * @LastEditTime: 2022-10-27 10:13:30
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\player\Index.vue
-->
<template>
    <div class="flex-shrink-0 overflow-hidden w-full">
        <!-- 上半部分 -->
        <div class="flex items-center justify-center text-violet-50 pb-2">
            <div class="flex mr-2 items-end">
                <!-- 播放按钮 -->
                <div class="i-ri-disc-line text-6xl cursor-pointer" :class="{ 'animate-spin': !paused }"
                    @click="clickPlay"></div>
            </div>
            <div v-if="activeSong.id" class="flex-1">
                <div class="flex items-center my-1">
                    <!-- 标题 -->
                    <div class="flex items-center flex-1 text-lg">
                        <div class=" flex-shrink-0">{{ activeSong?.title }}</div>
                        <div class="px-2 py-1px ml-2 text-xs leading-none text-violet-300 bg-violet-600/50 font-mono">
                            {{
                                    activeSong?.file?.type
                                        .split('/')[1]
                                        .toUpperCase()
                            }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center text-sm text-violet-300">
                    <!-- 专辑 -->
                    <div class="flex flex-shrink-0 items-center mr-3 cursor-pointer hover:text-violet-50">
                        <div class="i-ri-hashtag mr-1"></div>
                        {{ activeSong?.album?.title }}
                    </div>
                    <!-- 歌手 -->
                    <div class="flex flex-shrink-0 items-center mr-3 cursor-pointer hover:text-violet-50">
                        <div class="i-ri-at-line mr-1"></div>
                        {{ activeSong?.album?.artist?.title }}
                    </div>
                    <!-- 时间 -->
                    <div class="flex-grow flex-shrink-0 text-violet-300 text-xs text-right mr-1 font-mono">
                        {{ formatTime(currentTime) }} /
                        {{ formatTime(duration) }}
                    </div>
                </div>
            </div>
            <!-- logo -->
            <div v-else class="text-40px font-bold mr-4 cursor-pointer" @click="clickPlay">
                ezMusic
            </div>
        </div>
        <!-- 进度条 -->
        <div
            class="bg-violet-700 border-t-1px border-t-violet-600 border-b-1px border-b-violet-400 rounded overflow-hidden relative">
            <div class="h-1 bg-white/50 rounded" :style="{ width: progress }"></div>
        </div>
        <!-- 下半部分 -->
        <div v-if="activeSong.id" class="flex items-center pt-2 text-sm text-violet-200">
            <!-- 下一首 -->
            <div class="flex items-center py-1 px-1 mr-1 rounded cursor-pointer hover:bg-violet-600 hover:text-white">
                <div class="i-ri-skip-forward-fill cursor-pointer" @click="playNextSong"></div>
            </div>
            <!-- 歌单 -->
            <div @click="clickPlayList"
                class="flex flex-shrink-0 items-center py-1 px-2 rounded cursor-pointer hover:bg-violet-600 hover:text-white">
                <div class="i-ri-play-list-fill mr-1"></div>
                {{ activeList.title }}
                <div class="px-1 py-1px ml-1 text-xs leading-none text-violet-300 bg-violet-600/50 font-mono">
                    {{ total }}
                </div>
            </div>

            <!-- 播放顺序 -->
            <div class="flex flex-shrink-0 items-center py-1 px-2 rounded cursor-pointer hover:bg-violet-600 hover:text-white"
                @click="changeMode">
                <div class="mr-1" :class="{
                    'i-ri-repeat-one-line': activeMode.value === 'one',
                    'i-ri-order-play-line': activeMode.value === 'loop',
                    'i-ri-shuffle-line': activeMode.value === 'shuffle'
                }"></div>
                {{ activeMode.label }}
            </div>

            <div class="flex-1 flex flex-row-reverse">
                <div
                    class="flex flex-shrink-0 items-center py-1 px-1 rounded cursor-pointer hover:bg-violet-600 hover:text-white">
                    <div class="i-ri-layout-grid-fill"></div>
                </div>
            </div>
        </div>
        <!-- 设置按钮 -->
        <NuxtLink
            class="i-ri-settings-4-fill absolute top-1 right-1 z-10 cursor-pointer text-xs text-violet-400 hover:text-white"
            title="设置" :to="{ name: 'configure' }">
        </NuxtLink>
        <!-- loading -->
        <div v-if="loading"
            class="i-ri-loader-4-fill absolute bottom-1 right-1 z-10 text-xs text-violet-400 animate-spin"></div>
        <audio src="" ref="audio"></audio>
    </div>
</template>

<script setup>
const api = useApi()
const config = useConfig()
const loading = ref(false) // 加载中
const activeList = ref({ id: 0, title: '全部歌曲' }) // 当前播放歌单
const total = ref(0) // 歌单歌曲数量
const mode = ref([
    // 播放模式
    { label: '随机播放', value: 'shuffle' },
    { label: '列表循环', value: 'loop' },
    { label: '单曲循环', value: 'one' }
])
const activeModeIndex = ref(0)
const activeMode = computed(() => {
    return mode.value[activeModeIndex.value]
}) //当前播放模式
const activeSong = ref({}) // 当前歌曲

const audio = ref(null)
const paused = ref(true) // 是否已暂停
const duration = ref(0) // 音频长度
const currentTime = ref(0) // 当前播放进度
const progress = computed(() => {
    let p = 0
    if (activeSong.value) {
        p = Math.round((currentTime.value / duration.value) * 10000) / 100
    }
    return p ? `${p}%` : '0%'
})

// 找 active 的歌单
const fetchActiveList = async () => {
    loading.value = true
    const { data, error } = await api.playlist.fetch({
        'filter[active]': true,
        fields: ['id', 'title', 'count(song_id)']
    })
    loading.value = false

    // watch(error, (val) => {
    //     console.log('[error]', val)
    //     alert('数据加载异常, 请检查配置项或刷新重试!')
    // })

    if (data.value.data.length > 0) {
        // 如果有 active 歌单
        activeList.value = {
            id: data.value.data[0].id,
            title: data.value.data[0].title
        }
        total.value = data.value.data[0].song_id_count
        return
    }
    // 否则取所有歌曲数量
    await fetchALlSong()
}

// 取歌曲总数
const fetchALlSong = async () => {
    loading.value = true
    const { data } = await api.song.fetch({
        limit: 0,
        meta: '*'
    })
    loading.value = false
    total.value = data.value.meta.total_count
}

// 随机数 res >= min ; res < max;
const random = (max, min = 1) => {
    // https://blog.csdn.net/qq_29132907/article/details/77101665
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 格式化时间
const formatTime = (timer) => {
    const m = Math.floor(timer / 60)
    const s = Math.floor(timer - m * 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

// 读取下一首
const fetchNextSong = async () => {
    let offset = 0

    // 单曲循环
    // 如果没有当前歌曲, 则走后面流程取第一首歌曲, 否则直接播放当前歌曲
    if (activeSong.value.id !== undefined && activeMode.value.value === 'one') {
        audio.value.play()
        return
    }

    // 循环播放
    // 如果没有当前歌曲, 则走后面流程取第一首歌曲, 否则去下一首
    if (
        activeSong.value.id !== undefined &&
        activeMode.value.value === 'loop'
    ) {
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

    loading.value = true
    const { data } = await api.song.fetch({
        offset,
        limit: 1,
        fields: [
            'id',
            'title',
            // 'track',
            // 'album.*',
            'album.id',
            'album.title',
            // 'album.artist.*',
            'album.artist.id',
            'album.artist.title',
            // 'file.*',
            'file.type',
            'file.filename_disk'
        ]
    })
    loading.value = false

    if (data.value.data.length === 0) {
        return
    }

    activeSong.value = data.value.data[0]
    activeSong.value.index = offset
    audio.value.src =
        config.storageUrl + activeSong.value.file.filename_disk
    audio.value.play()
}

// 点击播放按钮
const clickPlay = async () => {
    // 判断配置
    if (!config.perfected) {
        navigateTo({ name: 'configure' })
        return
    }

    // 没有歌曲信息
    if (activeSong.value.id === undefined) {
        await fetchNextSong()
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

// 播放下一首
//TODO 单曲循环时, 没法下一首
const playNextSong = async () => {
    // 判断配置
    if (!config.perfected) {
        navigateTo({ name: 'configure' })
        return
    }
    await fetchNextSong()
}

// 切换播放模式
const changeMode = () => {
    activeModeIndex.value = activeModeIndex.value + 1
    activeModeIndex.value = activeModeIndex.value % mode.value.length
}

// 点击歌单
const clickPlayList = () => {
    navigateTo({ name: 'playlist' })
}

onMounted(async () => {
    if (config.perfected) {
        await fetchActiveList() // 获取 当前播放歌单

        // 加载到媒体的元信息
        audio.value.addEventListener('loadedmetadata', () => {
            duration.value = audio.value.duration // 音频时长
            // console.log('muted', el.value.muted)  // 是否静音
        })

        // 播放
        audio.value.addEventListener('play', () => {
            paused.value = false
        })
        // 暂停
        audio.value.addEventListener('pause', () => {
            paused.value = true
        })

        // 播放中 更新进度
        audio.value.addEventListener('timeupdate', () => {
            currentTime.value = audio.value.currentTime
        })

        // 播放结束
        audio.value.addEventListener('ended', async () => {
            // 随机播放下一首
            await fetchNextSong()
        })
    }
})
</script>
    