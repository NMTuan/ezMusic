/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-06-18 22:31:07
 * @LastEditTime: 2022-08-09 14:09:14
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezMusic\composables\useApi\playlist_song.ts
 */
export default {
    fetch: (id) => {
        const filter = new URLSearchParams()
        return useApiFetch('/items/playlist_song', {
            method: 'get',
            params: {
                'filter[playlist_id][_eq]': id,
                fields: [
                    'song_id.id',
                    'song_id.title',
                    'song_id.file.filename_disk',
                    'song_id.album.id',
                    'song_id.album.title',
                    'song_id.album.artist.id',
                    'song_id.album.artist.title'
                ],
                meta: '*'
            }
        })
    }
}
