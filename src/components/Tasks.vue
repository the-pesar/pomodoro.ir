<template>
  <div class="create-task">
    <span>Create Task</span>
  </div>
  <div class="task" v-for="task in tasks" :key="task.id">
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
import { useTasks } from "@/composable/tasks"

const { tasks, selectTask } = useTasks()
</script>
<style lang="scss" scoped>
.create-task {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 5px;
  margin-top: 20px;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  height: 55px;
  opacity: 0.8;
  cursor: pointer;
  span {
    color: #fff;
    text-transform: capitalize;
    font-size: 18px;
    opacity: 0.8;
  }
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-glass);
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
  border-left: 5px solid #fff;
  height: 50px;
  span {
    color: #fff;
    text-transform: capitalize;
    font-size: 18px;
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
</style>
