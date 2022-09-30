import { ref } from "vue"
import { v4 as uuidv4 } from "uuid"

interface TaskI {
  id: string
  name: string
  selected: boolean
  focus: number
  shortBreak: number
  longBreak: number
  count: number
}

interface UpdateTaskI {
  focus?: boolean
  shortBreak?: boolean
  longBreak?: boolean
  count?: boolean
}

const tasks = ref<TaskI[]>([])

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
  tasks.value = tasks.value.map((task) => {
    if (id === task.id) task.selected = true
    else task.selected = false
    return task
  })
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

function updateTask(
  id: string,
  { focus, shortBreak, longBreak, count }: UpdateTaskI
) {
  const i = tasks.value.findIndex((v) => v.id === id)
  if (focus) tasks.value[i].focus++
  if (shortBreak) tasks.value[i].shortBreak++
  if (longBreak) tasks.value[i].longBreak++
  if (count) tasks.value[i].count++
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
}

initTasks()

// createTask("learning ASI concept")
// createTask("start the bytecast...")
// createTask("improve programming Knowledge")

export function useTasks() {
  return { tasks, createTask, deleteTask, selectTask, updateTask }
}
