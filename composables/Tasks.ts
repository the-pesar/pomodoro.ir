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
  tasks.value.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return task
}

function deleteTask(id: string): ITask[] {
  const i = tasks.value.findIndex((v) => v.id === id)
  const task = tasks.value.splice(i, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return task
}

function selectTask(id: string): ITask | undefined {
  tasks.value = tasks.value.map((task) => {
    if (task.id === id) {
      task.selected = true
    } else task.selected = false
    return task
  })
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return selectedTask.value
}

function editTask(id: string, newName: string): ITask {
  // TODO -> remove console.log
  console.log(newName)

  const i = tasks.value.findIndex((task) => task.id === id)
  tasks.value[i].name = newName
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return tasks.value[i]
}

function updateTask(id: string, property: ITaskTime): ITask {
  const i = tasks.value.findIndex((task) => task.id === id)
  tasks.value[i][property]++
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  return tasks.value[i]
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
