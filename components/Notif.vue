<template>
  <div class="absolute left-0 right-0 mx-auto w-fit mt-10 bg-white flex p-4 rounded-lg">
    <!-- <img src="/ad-icons/pagelines.svg" width="35" /> -->
    <p class="px-2 text-[#ba4949] text-lg">لطفا قبل از انجام این کار وارد شوید!</p>
  </div>
</template>
<style scoped>
@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
