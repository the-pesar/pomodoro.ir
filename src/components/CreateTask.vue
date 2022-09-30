<template>
  <div v-if="createMode" class="create-mode">
    <input
      v-model="newTask"
      ref="input"
      type="text"
      placeholder="write a name for task..."
      @blur="createMode = false"
      @keypress.enter="createAction"
    />
    <button @click="createAction">create</button>
  </div>
  <div v-else class="button-mode" @click="switchToCreateMode">
    <span>Create Task</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue"
import { useTasks } from "@/composable/tasks"

const { createTask } = useTasks()

const createMode = ref<boolean>(false)
const newTask = ref<string>("")
const input = ref<HTMLInputElement>()

const switchToCreateMode = async () => {
  createMode.value = true
  await nextTick()
  input.value?.focus()
}

const createAction = () => {
  if (newTask.value === "") return
  createTask(newTask.value)
  newTask.value = ""
}
</script>

<style lang="scss" scoped>
.button-mode {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  height: 55px;
  opacity: 0.8;
  cursor: pointer;
  margin-top: 20px;
  span {
    color: #fff;
    text-transform: capitalize;
    font-size: 18px;
    opacity: 0.8;
  }
}
.create-mode {
  display: flex;
  background-color: var(--bg-glass);
  border-radius: 8px;
  border-left: 7px solid #fff;
  margin-top: 20px;
  input {
    width: 100%;
    height: 59px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 0 15px;
    text-transform: capitalize;
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  button {
    display: flex;
    align-items: center;
    background-color: var(--bg-glass);
    padding: 0 20px;
    // border-top-right-radius: 8px;
    // border-bottom-right-radius: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: #fff;
    border: none;
    font-weight: 600;
    font-size: 16px;
    margin: 10px;
  }
}
</style>
