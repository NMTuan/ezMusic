<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 16:05:46
 * @LastEditTime: 2022-09-19 16:30:13
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\layouts\default.vue
-->
<template>
    <div class="
    flex flex-col justify-center
    text-white 
    w-480px
    m-2 p-2 mx-auto 
    bg-violet-500 
    rounded-lg border-4 border-white 
    relative 
    shadow-lg 
    ">
        <MyPlayer />
        <div class="
        overflow-hidden mt-2
        bg-gradient-to-b from-violet-700 to-purple-900/50
        shadow-inner
        rounded
        text-violet-200
        ">
            <Simplebar>
                <div>
                    <slot />
                </div>
            </Simplebar>
        </div>
    </div>
</template>
