<template>
  <main>
    <Progress />
  </main>
</template>

<script lang="ts" setup>
import { Component, defineAsyncComponent } from "vue";
const Progress: Component = defineAsyncComponent(
  () => import("@/components/Progress.vue")
);
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
}
</style>
