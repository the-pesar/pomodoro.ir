<template>
  <a
    class="absolute bottom-0 right-0 m-5 invisible xl:visible"
    :href="ads[randomAdIndex].link"
    target="_blank"
  >
    <div class="flex items-center bg-glass fade-in-animation p-3 rounded-lg">
      <img :src="`/ad-icons/${ads[randomAdIndex].icon}`" width="35" alt="Advertise" />
      <p class="text-white px-2" v-text="ads[randomAdIndex].text"></p>
    </div>
  </a>
</template>

<script lang="ts" setup>
const ads = ref([
  {
    icon: "pagelines.svg",
    text: "واسه‌ بقای من ازم حمایت مالی کن!",
    link: "https://daramet.com/",
  },
  {
    icon: "pagelines.svg",
    text: "واسه‌ بقای من ازم حمایت مالی کن!",
    link: "http://coffeete.ir/",
  },
  {
    icon: "twitter.svg",
    text: "واسه باخبر شدن از آپدیت‌ها منو توی توییتر دنبال کن!",
    link: "https://twitter.com/pomodoro_ir",
  },
  {
    icon: "github.svg",
    text: "برای حمایت از من بهم تو گیتهاب استار بده",
    link: "https://github.com/the-pesar/pomodoro.ir",
  },
])

const randomAdIndex = ref<number>(3)
</script>
