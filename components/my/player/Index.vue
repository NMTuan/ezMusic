<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:47:05
 * @LastEditTime: 2022-08-14 19:05:35
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\player\Index.vue
-->
<template>
    <div class="h-25">
        <div class="flex items-center h-24 p-2">
            <div class="flex items-center w-20 h-20 text-16 text-violet-500 bg-violet-50 rounded-sm cursor-pointer">
                <div class="i-ri-play-fill mx-auto" v-if="paused" @click="clickPlay"></div>
                <div class="i-ri-pause-fill mx-auto" v-else @click="clickPause"></div>
            </div>
            <div class="flex-1 pl-2 leading-none">
                <div v-if="currentSong">
                    <div class="text-lg font-bold">{{ currentSong.title }} </div>
                    <div class="flex">
                        <div class="flex-1 text-sm mt-1.5 text-neutral-600">
                            <div class="flex items-center">
                                <div class="i-ri-hashtag"></div> {{ currentSong.album.title }}
                            </div>
                            <div class="flex items-center">
                                <div class="i-ri-at-line"></div> {{ currentSong.album.artist.title }}
                            </div>
                        </div>
                        <div class="self-end text-xs mr-1">{{ formatTime(currentTime) }} /
                            {{ formatTime(duration) }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class=" bg-violet-100">
            <div class=" h-1 bg-violet-500" :style="{ width: progress }">
            </div>
        </div>
        <audio class="fixed z-10 h-13.5 bg-gray-400" ref="el"></audio>
    </div>
</template>
<script setup>
const player = usePlayer()
const el = ref(null)
const paused = ref(false)   // 是否已暂停
const duration = ref(0) // 音频长度
const currentTime = ref(0) // 当前播放进度
const currentSong = computed(() => {    // 当前歌曲
    return player?.currentSong?.song_id
})
const progress = computed(() => {
    if (currentSong.value) {
        return `${Math.round((currentTime.value / duration.value) * 10000) / 100}%`
    }
    return '0%'
})

player.el = el  // 把播放器元素传递到pinia

// 点击播放
const clickPlay = () => {
    el.value.play()
}
// 点击暂停
const clickPause = () => {
    el.value.pause()
}

const formatTime = (timer) => {
    const m = Math.floor(timer / 60)
    const s = Math.floor(timer - m * 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

onMounted(() => {
    // 加载到媒体的元信息
    el.value.addEventListener('loadedmetadata', () => {
        duration.value = el.value.duration // 音频时长
        // console.log('muted', el.value.muted)  // 是否静音
    })
    // 播放
    el.value.addEventListener('play', () => {
        paused.value = false
    })
    // 暂停
    el.value.addEventListener('pause', () => {
        paused.value = true
    })
    // 播放中 更新进度
    el.value.addEventListener('timeupdate', () => {
        currentTime.value = el.value.currentTime
    })
    // 播放结束
    el.value.addEventListener('ended', () => {
        // 随机播放下一首
        player.randomPlay()
    })
})

</script>
