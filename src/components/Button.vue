<template>
  <div class="wrapper">
    <button>
      <slot />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  button {
    outline: none;
    border: none;
    padding: 15px 60px;
    font-size: 19px;
    font-family: "Poppins", sans-serif;
    border-radius: 5px;
    cursor: pointer;
    color: $primary-color;
    background-color: $secondary-color;
    &:active {
      transform: scale(.95);
    }
  }
}
</style>
