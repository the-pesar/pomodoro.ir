import { ref, computed } from "vue"
import { v4 as uuidv4 } from "uuid"

export interface TaskI {
  id: string
  name: string
  selected: boolean
  focus: number
  shortBreak: number
  longBreak: number
  count: number
}

const tasks = ref<TaskI[]>([])

const selectedTask = computed<TaskI | undefined>(() =>
  tasks.value.find((v) => v.selected)
)

function initTasks() {
  const localTasks = localStorage.getItem("tasks")
  if (!localTasks) return localStorage.setItem("tasks", "[]")
  try {
    tasks.value = JSON.parse(localTasks)
  } catch {
    localStorage.setItem("tasks", "[]")
  }
}

function createTask(name: string) {
  const id = uuidv4()
  tasks.value.push({
    id,
    name,
    selected: false,
    focus: 0,
    shortBreak: 0,
    longBreak: 0,
    count: 0,
  })
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return id
}

function deleteTask(id: string) {
  const i = tasks.value.findIndex((v) => v.id === id)
  tasks.value.splice(i, 1)
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

function selectTask(id: string) {
  console.log(id)
  tasks.value = tasks.value.map((task) => {
    if (id === task.id) task.selected = true
    else task.selected = false
    return task
  })
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

function updateTask(
  id: string,
  key: "focus" | "short-break" | "long-break" | "count"
) {
  const i = tasks.value.findIndex((v) => v.id === id)
  if (key === "focus") tasks.value[i].focus++
  if (key === "short-break") tasks.value[i].shortBreak++
  if (key === "long-break") {
    tasks.value[i].longBreak++
    tasks.value[i].count++
  }
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

initTasks()

// createTask("learning ASI concept")
// createTask("start the bytecast...")
// createTask("improve programming Knowledge")

export function useTasks() {
  return { tasks, selectedTask, createTask, deleteTask, selectTask, updateTask }
}
