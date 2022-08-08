<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-08-08 21:18:35
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\app.vue
-->
<template>
  <div>
    <Player />
    <PlayList />
    <!-- <div text="5xl sky" m="x-auto b-2" class="i-ri-global-line">
    </div>
    <div bg="sky" p="y-2" border="rounded-lg" text="white" m="t-2">
      hello world
    </div>
    <div class="flex justify-center py-4">
      <ChangeLanguage />
      <ToggleDark />
    </div>
    <div bg="yellow-100 dark:yellow-900" p="4" text="sky-400 dark:green-200">
      {{ $t('menu.home') }}
    </div> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// 设定默认语言
const { locale } = useI18n()
const i18nCookie = useCookie('i18n')
if (i18nCookie.value) {
  locale.value = i18nCookie.value
}
</script>
