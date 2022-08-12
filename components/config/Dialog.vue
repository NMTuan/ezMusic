<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-11 15:05:23
 * @LastEditTime: 2022-08-12 09:46:33
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\config\dialog.vue
-->
<template>
    <div class="text-neutral-600">
        <transition name="fade">
            <div v-if="show" class="absolute inset-0 z-10 bg-neutral-900/50" @click="clickMask">
                <Simplebar class="relative z-20">
                    <div class=" bg-white mx-auto my-12vh overflow-hidden rounded p-4
                    w-90%
                    sm:w-80%
                    md:w-70% 
                    lg:w-50%

                    " @click.stop="clickContainer">
                        <div class="flex items-center text-lg">
                            <div class="flex-1">
                                {{ title }}
                            </div>
                            <div class="i-ri-close-line cursor-pointer
                            hover:text-violet-400
                            " @click="clickCloseIcon">
                            </div>
                        </div>
                        <div class="my-6">
                            <slot />
                        </div>
                        <div v-if="$slots.foot">
                            <slot name="foot" :close="close" />
                        </div>
                    </div>
                </Simplebar>
            </div>
        </transition>
    </div>
</template>
<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    }
})
const emits = defineEmits([
    'update:show'
])

const close = () => {
    emits('update:show', false)
}

const clickMask = () => {
    // close()
}
const clickCloseIcon = () => {
    close()
}
const clickContainer = () => {
    return
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
