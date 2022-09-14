<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-11 20:04:03
 * @LastEditTime: 2022-09-07 17:12:26
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\playlist\index.vue
-->
<template>
    <div>
        <!-- <div class="flex flex-col flex-1 overflow-hidden relative m-1 rounded bg-white">
        <div class="flex-1 overflow-hidden">
            <Simplebar>
                <MyCurrentListItem v-for="item in player.list" :item="item" />
            </Simplebar>
        </div>
    </div> -->
        <MyDialog>
            playList
        </MyDialog>
    </div>
</template>
<script setup>
const player = usePlayer()

</script>
