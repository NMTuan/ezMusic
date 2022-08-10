<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 15:35:30
 * @LastEditTime: 2022-08-10 11:46:37
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\pages\index.vue
-->
<template>
    <div>
        <div>
            api url prefix:
            <input type="text" v-model="apiUrlPrefix">
            {{ apiUrlPrefix }}
        </div>
        <div>
            minio url prefix:
            <input type="text" v-model="storageUrlPrefix">
            {{ storageUrlPrefix }}
        </div>
    </div>
</template>
<script lang="ts" setup>
const apiUrlPrefix = ref(useCookie('apiUrlPrefix').value || '')
const storageUrlPrefix = ref(useCookie('storageUrlPrefix').value || '')

watchEffect(() => {
    useCookie('apiUrlPrefix').value = apiUrlPrefix.value
})
watchEffect(() => {
    useCookie('storageUrlPrefix').value = storageUrlPrefix.value
})

</script>
