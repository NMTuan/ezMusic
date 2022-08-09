<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:47:05
 * @LastEditTime: 2022-08-09 17:03:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\player\Index.vue
-->
<template>
    <div class="h-13.5">
        <audio class="fixed z-10 h-13.5 bg-gray-400" ref="el" controls @ended="handleEnded"></audio>
    </div>
</template>
<script setup>
const player = usePlayer()
const el = ref(null)
player.el = el

const handleEnded = () => {
    player.randomPlay()
}
</script>
