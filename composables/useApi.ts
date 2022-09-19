/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-18 22:05:42
 * @LastEditTime: 2022-09-15 10:54:33
 * @LastEditors: NMTuan
 * @Description: 自动加载api
 * @FilePath: \ezMusic\composables\useApi\index.ts
 */
import playlist from './useApi/playlist'
import playlist_song from './useApi/playlist_song'
import song from './useApi/song'
interface Api {
    [propName: string]: any
}

const api: Api = {
    playlist,
    playlist_song,
    song
}
// const files = import.meta.globEager('./*.ts')
// Object.keys(files).forEach((key) => {
//     const label = key.replace(/^\.\/(.*?)\.ts$/gi, '$1')
//     api[label] = files[key].default
// })

export default () => {
    return api
}
