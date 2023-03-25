<template>
  <div
    v-show="show"
    class="absolute z-10 right-7 top-7 mx-auto w-fit bg-white flex p-5 rounded-lg">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_64813)">
        <path
          d="M23.625 12C23.625 18.4217 18.4199 23.625 12 23.625C5.58014 23.625 0.375 18.4217 0.375 12C0.375 5.58202 5.58014 0.375 12 0.375C18.4199 0.375 23.625 5.58202 23.625 12ZM12 14.3438C10.8091 14.3438 9.84375 15.3091 9.84375 16.5C9.84375 17.6909 10.8091 18.6562 12 18.6562C13.1909 18.6562 14.1562 17.6909 14.1562 16.5C14.1562 15.3091 13.1909 14.3438 12 14.3438ZM9.95283 6.59316L10.3005 12.9682C10.3168 13.2665 10.5635 13.5 10.8622 13.5H13.1378C13.4365 13.5 13.6832 13.2665 13.6995 12.9682L14.0472 6.59316C14.0648 6.27094 13.8082 6 13.4855 6H10.5144C10.1917 6 9.93525 6.27094 9.95283 6.59316Z"
          fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_64813">
          <rect width="24" height="24" fill="blue" />
        </clipPath>
      </defs>
    </svg>
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
