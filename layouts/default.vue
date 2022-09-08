<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-08 11:01:23
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\layouts\default.vue
-->
<template>
    <div>
        <MyPlayerTest />
        <div>
            <NuxtLink :to="{name: 'index'}">[index]</NuxtLink>
            <NuxtLink :to="{name: 'playlist'}">[playList]</NuxtLink>
        </div>
        <slot />
    </div>
</template>
