/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:58:30
 * @LastEditTime: 2022-08-09 16:26:12
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\usePlayer.ts
 */
import { defineStore } from 'pinia'

export default () => {
    const config = useRuntimeConfig()
    const api = useApi()

    const store = defineStore('auth', {
        state: () => {
            return {
                el: null, // 播放器
                list: [], // 播放列表
                currentId: '' //当前歌曲id
            }
        },
        getters: {
            // 当前歌曲
            currentSong(state) {
                return state.list.find(
                    (item) => item.song_id.id === state.currentId
                )
            }
        },
        actions: {
            // 替换播放列表
            replaceList(data) {
                if (Array.isArray(data)) {
                    this.list = data
                }
            },
            // 播放歌曲
            play(id) {
                if (typeof id === 'undefined') {
                    return
                }
                this.currentId = id
                this.el.src =
                    config.public.minioUrlPrefix +
                    this.currentSong.song_id.file.filename_disk
                this.el.play()
            },
            // 获取随机数, 0 ~ list.length - 1
            random() {
                return Math.floor(Math.random() * this.list.length)
            },
            // 随机播放
            randomPlay() {
                this.play(this.list[this.random()].song_id.id)
            }
        }
    })
    return store()
}
