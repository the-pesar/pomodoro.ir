<template>
  <Pmdr />
  <Notif />
  <Ad />
  <!-- <Desc /> temporary -->
  <!-- <Footer /> temporary -->
</template>
<script setup>
useHead({
  title: 'مدیریت زمان به روش پومودورو',
  meta: [{ name: 'theme-color', description: 'یک برنامه ساده برای تکنیک  پومودورو (Pomodoro) که روی مرورگر دسکتاپ و موبایل کار می کند. این برنامه به شما کمک می کند زمان خود را مدیریت کنید و به شما امکان می دهد بر روی هر کاری مانند مطالعه، نوشتن یا کدنویسی تمرکز کنید.' }],
  link: [{ rel: 'manifest', href: 'https://pomodoro.ir/manifest.json' }],
})
</script>
