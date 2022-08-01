<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-01 20:47:05
 * @LastEditTime: 2022-08-01 21:01:52
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\player\Index.vue
-->
<template>
    <div>
        <audio ref="el" controls></audio>
    </div>
</template>
<script setup>
const player = usePlayer()
const el = ref(null)
player.el = el
</script>
