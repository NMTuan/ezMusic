<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-16 16:41:23
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\layouts\default.vue
-->
<template>
    <div class="
    flex flex-col
    text-white m-2 p-2 bg-violet-500 rounded-lg overflow-hidden border-4 border-white mx-auto relative shadow-lg 
    ">
        <MyPlayer />
        <!-- <div class="flex-1"> -->
        <!-- <Simplebar> -->
        <slot />
        <!-- </Simplebar> -->
        <!-- </div> -->
    </div>
</template>
