<template>
  <div
    class="wrapper"
    :class="modelValue ? 'active' : 'unactive'"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="content">
      <h3>Notification Permission</h3>
      <p>Please give us notification access for better user experience</p>
      <div class="button-wrapper">
        <button @click="sendRequest">Ok, thanks</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue"

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void
}>()

const sendRequest = () => {
  Notification.requestPermission()
  .finally(() => {
    emit("update:modelValue", false)
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: all 0.5s;
  .content {
    position: absolute;
    top: 50px;
    left: 50%;
    width: 500px;
    transform: translate(-50%);
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    @media screen and (max-width: 640px) {
      width: 350px;
    }
    p,
    h3 {
      color: #231f20;
    }
    .button-wrapper {
      display: flex;
      justify-content: flex-end;
      button {
        background-color: var(--status-color);
        border: none;
        outline: none;
        padding: 10px 20px;
        font-family: "Poppins", sans-serif, system-ui;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        &:active {
          transform: scale(0.95);
        }
      }
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
