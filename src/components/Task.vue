<template>
  <div class="task">
    <span v-text="task.name"></span>
    <div class="flex">
      <button @click="selectTask(task.id)">
        {{ task.selected ? "selected" : "select" }}
      </button>
      <!-- <div class="cursor-pointer mx-2" @click="selectTask(task.id)">
        <img
          v-if="task.selected"
          src="@/assets/icons/pause-fill.svg"
          width="18"
          alt=""
        />
        <img v-else src="@/assets/icons/play-fill.svg" width="18" alt="" />
      </div> -->
      <div class="box mx-2">
        <img class="cursor-pointer" src="@/assets/icons/edit.svg" width="18" />
      </div>
      <div class="box mx-2">
        <img
          class="cursor-pointer"
          src="@/assets/icons/trash-fill.svg"
          width="18"
          @click="deleteTask(task.id)"
        />
      </div>
      <!-- <div v-text="task.count"></div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue"
import { TaskI, useTasks } from "@/composable/tasks"

const { selectTask, deleteTask } = useTasks()

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
  height: 60px;
  animation: expand 0.75s;
  span {
    color: #fff;
    text-transform: capitalize;
    font-size: 18px;
    outline: none;
  }
  button {
    background-color: rgba(255, 255, 255, 0.25);
    border: none;
    outline: none;
    font-family: "Poppins", sans-serif, system-ui;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    height: auto;
    width: 75px;
    font-size: 14px;
    margin: 0 5px;
    text-transform: capitalize;
    &:active {
      transform: scale(0.95);
    }
  }
  .box {
    background-color: rgba(255, 255, 255, 0.25);
    margin: 0px 5px;
    padding: 7px;
    border-radius: 5px;
    &:active {
      transform: scale(0.9);
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
