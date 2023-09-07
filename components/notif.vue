<template>
  <div
    v-show="show"
    class="absolute z-10 max-xl:left-0 max-xl:right-0 right-10 top-10 mx-auto w-fit bg-white flex p-5 rounded-lg">
    <img src="@/assets/icons/info.svg" alt="info" />
    <p class="px-2 text-lg" v-text="text"></p>
  </div>
</template>
<script lang="ts" setup>
import { useNotif } from '~/composables/Notif'
const { show, text } = useNotif()
</script>
<style scoped>
svg,
p {
  color: var(--status-color);
  transition: color 0.5s;
}

div {
  animation: bounceInDown 1s;
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 20px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
