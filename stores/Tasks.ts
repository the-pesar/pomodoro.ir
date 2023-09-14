import { v4 as uuidv4 } from 'uuid'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<ITask[]>([])
  const selectedTask = computed(() => tasks.value.find((v) => v.selected))

  function create(name: string) {
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

  function remove(id: string): ITask[] | undefined {
    const i = tasks.value.findIndex((task) => task.id === id)
    if (i !== -1) {
      const task = tasks.value.splice(i, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks.value))
      return task
    }
    return undefined
  }

  function select(id: string): ITask | undefined {
    tasks.value = tasks.value.map((task) => {
      task.id === id ? (task.selected = true) : (task.selected = false)
      return task
    })
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
    return selectedTask.value
  }

  function edit(id: string, newName: string): ITask | undefined {
    const i = tasks.value.findIndex((task) => task.id === id)
    return i !== -1
      ? ((tasks.value[i] = { ...tasks.value[i], name: newName }),
        localStorage.setItem('tasks', JSON.stringify(tasks.value)),
        tasks.value[i])
      : undefined
  }

  function update(id: string, property: ITaskTime): ITask | undefined {
    const i = tasks.value.findIndex((task) => task.id === id)
    return i !== -1
      ? (tasks.value[i][property]++,
        localStorage.setItem('tasks', JSON.stringify(tasks.value)),
        tasks.value[i])
      : undefined
  }

  try {
    tasks.value = JSON.parse(localStorage.getItem('tasks') ?? '[]')
  } catch {
    tasks.value = []
  }
  
  console.log(tasks.value);
  
  return {
    tasks,
    selectedTask,
    create,
    remove,
    select,
    edit,
    update,
  }
})
