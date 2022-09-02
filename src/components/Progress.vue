<template>
  <div class="container">
    <h1>Coming Soon...</h1>
    <div class="loading">
      <div class="progress"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.container {
  --width: 10%;
}
.container > h1 {
  font-size: 18px;
  color: $secondary-color;
}
.container > .loading {
  display: flex;
  align-items: center;
  height: 30px;
  width: 600px;
  border: 2px solid $secondary-color;
}
.container > .loading > .progress {
  height: 95%;
  margin: 0 1px;
  width: 9%;
  background-color: $secondary-color;
  animation: progressing 2s infinite;
}
@media screen and (max-width: 670px) {
  .container > .loading {
    width: 350px;
  }
}
@keyframes progressing {
  0% {
    width: calc(var(--width) - 2%);
  }
  50% {
    width: calc(var(--width) + 1%);
  }
  100% {
    width: calc(var(--width) - 2%);
  }
}
</style>
