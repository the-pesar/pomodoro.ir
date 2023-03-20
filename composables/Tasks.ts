import { v4 as uuidv4 } from "uuid"

interface TaskI {
  id: string
  name: string
  selected: boolean
  focus: number
  shortBreak: number
  longBreak: number
}

const tasks = ref<TaskI[]>([])

function createTask(name: string) {
  const task: TaskI = {
    id: uuidv4(),
    name,
    selected: false,
    focus: 0,
    shortBreak: 0,
    longBreak: 0,
  }
  tasks.value.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return task
}

function deleteTask(id: string) {
  const i = tasks.value.findIndex((v) => v.id === id)
  const task = tasks.value.splice(i, 1)
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return task
}

function selectTask(id: string): TaskI | null {
  let selectedTask: TaskI | null = null
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      task.selected = true
      selectedTask = task
    } else task.selected = false
    return task
  })
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return selectedTask
}

function editTask(id: string, newName: string): TaskI {
  console.log(newName)

  const i = tasks.value.findIndex((task) => task.id === id)
  tasks.value[i].name = newName
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return tasks.value[i]
}

function updateTask(
  id: string,
  property: "focus" | "shortBreak" | "longBreak"
): TaskI {
  const i = tasks.value.findIndex((task) => task.id === id)
  tasks.value[i][property]++
  localStorage.setItem("tasks", JSON.stringify(tasks.value))
  return tasks.value[i]
}

try {
  tasks.value = JSON.parse(localStorage.getItem("tasks") ?? "[]")
} catch {
  tasks.value = []
}

export function useTasks() {
  return { tasks, createTask, deleteTask, selectTask, editTask, updateTask }
}
