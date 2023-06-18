//TODO-> remove console.time()

console.time();

import { v4 as uuidv4 } from 'uuid'

const tasks = ref<ITask[]>([])
const selectedTask = computed<ITask | undefined>(() => {
  return tasks.value.find((v) => v.selected)
})

function createTask(name: string) {
  const task: ITask = {
    id: uuidv4(),
    name,
    selected: false,
    focus: 0,
    shortBreak: 0,
    longBreak: 0,
  }
  tasks.value = [...tasks.value, task]
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return task
}
function deleteTask(id: string): ITask[] | undefined {
  const i = tasks.value.findIndex((task) => task.id === id)
  if (i !== -1) {
    const task = tasks.value.splice(i, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    return task
  }
  return undefined
}
function selectTask(id: string): ITask | undefined {
  tasks.value = tasks.value.map((task) => {
    task.id === id ? task.selected = true : task.selected = false
    return task
  })
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return selectedTask.value
}
function editTask(id: string, newName: string): ITask | undefined {
  const i = tasks.value.findIndex((task) => task.id === id)
  return i !== -1 ? ((tasks.value[i] = { ...tasks.value[i], name: newName }), localStorage.setItem('tasks', JSON.stringify(tasks.value)), tasks.value[i]) : undefined;
}
function updateTask(id: string, property: ITaskTime): ITask | undefined {
  const i = tasks.value.findIndex((task) => task.id === id)
  return i !== -1 ? ((tasks.value[i][property]++, localStorage.setItem('tasks', JSON.stringify(tasks.value)), tasks.value[i])) : undefined;
}
try {
  tasks.value = JSON.parse(localStorage.getItem('tasks') ?? '[]')
} catch {
  tasks.value = []
}
export function useTasks() {
  return {
    tasks,
    createTask,
    deleteTask,
    selectTask,
    editTask,
    updateTask,
    selectedTask,
  }
}

//TODO-> remove console.timeEnd()
console.timeEnd()
