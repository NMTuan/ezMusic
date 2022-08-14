<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-08-14 15:37:23
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\layouts\default.vue
-->
<template>
    <div class="flex flex-col h-full max-w-120 mx-auto overflow-hidden">
        <div class="flex-shrink-0 h-8vh"></div>
        <div class="flex flex-col flex-1 overflow-hidden 
    bg-white rounded
    shadow 
    ">
            <Player />
            <MyPlayList />
            <slot />
            <div class="p-1"></div>
        </div>
        <div class="flex-shrink-0 h-8vh"></div>
    </div>
</template>
