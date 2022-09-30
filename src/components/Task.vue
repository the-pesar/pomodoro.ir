<template>
  <div class="task">
    <span v-text="task.name"></span>
    <div>
      <button @click="selectTask(task.id)">
        {{ task.selected ? "selected" : "select" }}
      </button>
      <div v-text="task.count"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue"
import { TaskI, useTasks } from "@/composable/tasks"

const { selectTask } = useTasks()

defineProps<{
  task: TaskI
}>()
</script>
<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-glass);
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
  border-left: 7px solid #fff;
  height: 50px;
  animation: expand 0.75s;
  span {
    color: #fff;
    text-transform: capitalize;
    font-size: 18px;
    outline: none;
  }
  div {
    display: flex;
    button {
      background-color: rgba(255, 255, 255, 0.25);
      border: none;
      outline: none;
      font-family: "Poppins", sans-serif, system-ui;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      height: 35px;
      width: 80px;
      font-size: 14px;
      text-transform: capitalize;
      &:active {
        transform: scale(0.95);
      }
    }
    div {
      display: flex;
      align-items: center;
      padding: 0 10px;
      margin: 0 5px;
      border-radius: 4px;
      color: #fff;
    }
  }
}

@keyframes expand {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
</style>
