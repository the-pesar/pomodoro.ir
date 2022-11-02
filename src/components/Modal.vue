<template>
  <div
    class="wrapper"
    :class="modelValue ? 'active' : 'unactive'"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="content">
      <h3 class="my-4 text-xl"><slot name="title"></slot></h3>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: all 0.5s;
  .content {
    position: absolute;
    top: 5%;
    left: 50%;
    min-width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    z-index: 1000;
    transform: translate(-50%);
    @media screen and (max-width: 640px) {
      min-width: 350px;
    }
  }
}
.unactive {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}
.active {
  visibility: show;
  opacity: 1;
  pointer-events: auto;
}
</style>
