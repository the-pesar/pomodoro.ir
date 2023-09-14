<script lang="ts" setup>
const banners = ref([
  {
    icon: 'pagelines.svg',
    text: 'واسه‌ بقای من ازم حمایت مالی کن!',
    link: 'https://daramet.com/',
  },
  {
    icon: 'pagelines.svg',
    text: 'واسه‌ بقای من ازم حمایت مالی کن!',
    link: 'http://coffeete.ir/',
  },
  {
    icon: 'twitter.svg',
    text: 'واسه باخبر شدن از آپدیت‌ها منو توی توییتر دنبال کن!',
    link: 'https://twitter.com/pomodoro_ir',
  },
  {
    icon: 'github.svg',
    text: 'برای حمایت از من بهم تو گیتهاب استار بده',
    link: 'https://github.com/the-pesar/pomodoro.ir',
  },
])

const randomBanner = computed(() => banners.value[3])
</script>

<template>
  <a
    class="sticky inline-block bottom-10 mt-36 mx-5 invisible xl:visible"
    target="_blank"
    :href="randomBanner.link">
    <div class="flex items-center bg-glass fade-in-animation p-3 rounded-lg">
      <img
        :src="`/advertise-icons/${randomBanner.icon}`"
        width="35"
        alt="Advertise" />
      <p class="text-white px-2" v-text="randomBanner.text"></p>
    </div>
  </a>
</template>
