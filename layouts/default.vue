<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-09 11:51:44
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
            <NuxtLink :to="{name: 'configure'}">[configure]</NuxtLink>
        </div>
        <slot />
    </div>
</template>
