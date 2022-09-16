<template>
  <div class="task-wrapper">
    <span class="task">
      <slot />
    </span>
    <div class="progress-task"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue"

const props = defineProps<{
  time: number
  maxTime: number
}>()

const progressWidth = computed(() => {
  return `${100 - (props.time / props.maxTime) * 100}%`
})
</script>
<style lang="scss" scoped>
.task-wrapper {
  position: relative;
  background-color: var(--bg-glass);
  text-align: center;
  padding: 10px 0px;
  border-radius: 5px;

  .task {
    color: #fff;
    text-transform: capitalize;
    font-size: 20px;
  }
  .progress-task {
    position: absolute;
    font-size: 15px;
    top: 0;
    left: 0;
    height: 100%;
    width: v-bind(progressWidth);
    background-color: var(--bg-glass);
    border-radius: 5px;
    transition: width 0.5s;
  }
}
</style>
