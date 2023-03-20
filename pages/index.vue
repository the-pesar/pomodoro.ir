<template>
  <ClientOnly>
    <Pmdr />
    <Ad />
  </ClientOnly>
  <Desc />
  <Footer />
</template>
<script setup>
useHead({ title: "پومودورو", meta: [{ name: "theme-color" }] })
</script>
