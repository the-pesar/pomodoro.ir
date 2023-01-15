<template>
  <div class="pb-10">
    <CreateTask />
    <Task v-for="task in tasks" :key="task.id" :task="task"></Task>
  </div>
</template>
<script lang="ts" setup>
import { Component, defineAsyncComponent } from "vue"
import { useTasks } from "@/composable/tasks"

const { tasks } = useTasks()

const CreateTask: Component = defineAsyncComponent(
  () => import("@/components/CreateTask.vue")
)
const Task: Component = defineAsyncComponent(
  () => import("@/components/Task.vue")
)
</script>
