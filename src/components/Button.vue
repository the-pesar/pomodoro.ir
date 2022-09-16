<template>
  <div class="wrapper">
    <button @click="$emit('click', $event)">
      <slot />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue"

defineEmits<{
  (e: "click", v: MouseEvent): void
}>()
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  button {
    outline: none;
    border: none;
    width: 180px;
    height: 60px;
    font-size: 21px;
    font-family: "Poppins", sans-serif;
    border-radius: 5px;
    cursor: pointer;
    color: var(--bg-color);
    background-color: #fff;
    text-transform: uppercase;
    transition: color 0.5s;
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
