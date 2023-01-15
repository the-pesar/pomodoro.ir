<template>
  <div class="current-task">
    <span> {{ selectedTask?.name || "You have not selected a task yet" }}</span>
    <div class="progress-task"></div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps } from "vue"
import { useTasks } from "@/composable/tasks"

const { selectedTask } = useTasks()

const props = defineProps<{
  time: number
  maxTime: number
}>()

const progressWidth = computed(() => {
  return `${100 - (props.time / props.maxTime) * 100}%`
})
</script>

<style lang="scss" scoped>
.current-task {
  position: relative;
  background-color: var(--bg-glass);
  text-align: center;
  padding: 15px 0px;
  border-radius: 5px;
  span {
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
