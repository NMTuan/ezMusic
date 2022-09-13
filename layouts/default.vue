<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-13 17:42:45
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\layouts\default.vue
-->
<template>
    <div class="flex flex-col justify-center h-full">
        <MyPlayerTest />
        <div>
            <NuxtLink :to="{name: 'index'}">[index]</NuxtLink>
            <NuxtLink :to="{name: 'playlist'}">[playList]</NuxtLink>
            <NuxtLink :to="{name: 'configure'}">[configure]</NuxtLink>
        </div>
        <slot />
    </div>
</template>
