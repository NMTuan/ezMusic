<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-08-11 15:05:23
 * @LastEditTime: 2022-09-09 16:11:51
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\components\my\Dialog.vue
-->
<template>
    <div class="text-neutral-600">
        <div class="absolute inset-0 z-10 bg-neutral-900/50" @click="clickMask">
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
    </div>
</template>
<script setup>
const router = useRouter()
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
// const emits = defineEmits([
//     'update:show'
// ])

const close = () => {
    // emits('update:show', false)
    router.back()
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
