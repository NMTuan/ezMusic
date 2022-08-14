<!--
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-07-29 10:07:12
 * @LastEditTime: 2022-08-14 15:34:09
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezMusic\app.vue
-->
<template>
  <div class="h-full">
    <Transition name="fade">
      <MyLogo v-if='showLogo' :loading='loading' @click="clickLogo" />
    </Transition>
    <Transition name="fade">
      <NuxtLayout v-if="!showLogo">
        <NuxtPage />
      </NuxtLayout>
    </Transition>
    <MyDialog v-model:show="showDialog" title="注意事项">
      <div class="dialog leading-6">
        <p>
          本项目为纯静态的前端项目，不涉及任何音频资源的存储与分发。
          如有侵权或不当之处请与
          <a href="https://github.com/NMTuan" target="_blank">我</a>
          联系。
        </p>
        <p>
          本项目基于 MIT
          协议完全开源，你可以对源码做任意修改与使用，由此产生的法律问题本站及本项目原作者概不负责。
          <a href="https://github.com/NMTuan/ezMusic" target="_blank">
            <div class="i-ri-github-fill inline-block align-middle text-lg"></div>
          </a>
        </p>
        <p>
          后端服务需自行搭建，教程详见
          <a href="#" target="_blank">此处</a>
          。请确保拥有版权。
        </p>
        <p>请填写并保存以下两个配置信息，聆听自己的数字音频。</p>
        <p>
          <input type="text" class="dialog__input" v-model="apiUrl" placeholder="API URL" />
        </p>
        <p>
          <input type="text" class="dialog__input" v-model="storageUrl" placeholder="STORAGE URL" />
        </p>
        <p class="text-sm text-neutral-300">
          注：此信息仅存于当前浏览器，默认保存30天。
        </p>
      </div>
      <template #foot="{ close }">
        <div class="flex flex-row-reverse">
          <div @click="submit" class="dialog__button bg-violet-500 text-white hover:bg-violet-600">
            <div v-if="submitLoading" class="i-ri-loader-3-line text-lg animate-spin mx-auto"></div>
            <div v-else>保存</div>
          </div>
          <div @click="close" class="dialog__button text-violet-500 hover:bg-neutral-100">
            取消
          </div>
        </div>
      </template>
    </MyDialog>
    <div id="dialog"></div>
  </div>

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
  watch(res.data, () => {
    showLogo.value = false
    // 如果在首页, 则跳转到 playlist 页
    if (route.name === 'index') {
      navigateTo({ name: 'playlist' }, { replace: true })
    }
  })
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
  @apply bg-violet-50;
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
