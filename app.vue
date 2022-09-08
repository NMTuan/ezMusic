<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-09-07 17:13:46
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\app.vue
-->
<template>
  <div class="h-full">
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

const config = useRuntimeConfig()
const route = useRoute()
const api = useApi()
const showLogo = ref(true) // 显示 logo 还是 view
const loading = ref(false)  // logo 的 loading 状态
const showDialog = ref(false) // 显示配置对话
const submitLoading = ref(false)  // 配置表单 loading 状态

const apiUrl = useCookie('apiUrl', {
  expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})
const storageUrl = useCookie('storageUrl', {
  expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
})

// 从 .env文件中读取配置
if (!apiUrl.value && config.public.apiUrl) {
  apiUrl.value = config.public.apiUrl
}
if (!storageUrl.value && config.public.storageUrl) {
  storageUrl.value = config.public.storageUrl
}

// 是否需要配置 apiUrl / storageUrl
const httpReg = new RegExp(/^http(s)?\:\/\/.*/, 'i')
const needToConfig = computed(() => {
  return !httpReg.test(apiUrl.value) || !httpReg.test(storageUrl.value)
})

// 点击logo
const clickLogo = () => {
  if (needToConfig.value) {
    showDialog.value = true
  }
}

// 提交配置
const submit = () => {
  if (submitLoading.value) {
    return
  }
  if (needToConfig.value) {
    alert('请正确填写配置信息')
    return
  }
  submitLoading.value = true
  location.reload()
}

// 尝试获取所有歌单
const fetchPlaylist = () => {
  const res = api.playlist.fetch()
  watchEffect(() => {
    loading.value = res.pending.value
  })
  // 出错
  watch(res.error, () => {
    if (res.error.value !== null) {
      alert('获取歌单异常, 请尝试重新配置')
      apiUrl.value = ''
    }
  }, {
    immediate: true
  })
  // 成功得到返回
  // watch(res.data, () => {
  //   showLogo.value = false
  //   // 如果在首页, 则跳转到 playlist 页
  //   if (route.name === 'index') {
  //     navigateTo({ name: 'playlist' }, { replace: true })
  //   }
  // })
}

onMounted(() => {
  // 渐显logo
  showLogo.value = true
  // 如果无需配置, 则尝试获取歌单
  if (needToConfig.value === false) {
    loading.value = true
    setTimeout(fetchPlaylist, 2000)
  }
})

</script>
<style lang="scss" scoped>
.dialog {
  a {
    @apply text-violet-500 no-underline;

    &:hover {
      @apply opacity-75;
    }
  }

  &__input {
    @apply w-full px-4 py-2 border border-neutral-300 rounded outline-none;

    &:focus {
      @apply border-violet-500;
    }
  }

  &__button {
    @apply w-16 text-center cursor-pointer px-4 py-2 rounded ml-2 transition-all;
  }
}
</style>
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
  @apply bg-violet-50 text-neutral-800;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
