<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-09-19 16:30:43
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\app.vue
-->
<template>
  <div class="flex py-10 max-h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// 设定默认语言
// const { locale } = useI18n()
// const i18nCookie = useCookie('i18n')
// if (i18nCookie.value) {
//   locale.value = i18nCookie.value
// }
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: #ede9fe;
}

#__nuxt {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
