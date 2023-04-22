import { useTasks } from '~/composables/Tasks'

const { tasks, updateTask, selectedTask } = useTasks()

const statuses = ref<IStatus[]>([
  {
    name: 'focus',
    text: 'Focus',
    time: 1500, // 1500
    color: '#ba4949',
    active: false,
  },
  {
    name: 'short-break',
    text: 'Short Break',
    time: 300, // 300,
    color: '#61764b',
    active: false,
  },
  {
    name: 'long-break',
    text: 'Long Break',
    time: 900, // 900
    color: '#2f5d62',
    active: false,
  },
])

const status = computed<IStatus>(() => {
  return statuses.value.find((v) => v.active) as IStatus
})

function setStatus(newStatus: TimeLength) {
  statuses.value = statuses.value.map((v) => {
    v.active = v.name === newStatus
    return v
  })
  process.client && document.body.setAttribute('status', newStatus)
  process.client &&
    document.head
      .querySelector("meta[name='theme-color']")
      ?.setAttribute('content', status.value?.color as string)
}

function nextStatus() {
  if (!selectedTask.value) return
  switch (status.value?.name) {
    case 'focus':
      updateTask(selectedTask.value.id, 'focus')
      if (selectedTask.value.focus % 4 === 0) {
        setStatus('long-break')
      } else {
        setStatus('short-break')
      }
      break
    case 'short-break':
      updateTask(selectedTask.value.id, 'shortBreak')
      setStatus('focus')
      break
    case 'long-break':
      updateTask(selectedTask.value.id, 'longBreak')
      setStatus('focus')
      break
    default:
      break
  }
}

const setDefaultStatus = () => setStatus('focus')

setDefaultStatus()

export function useStatus() {
  return {
    status,
    setStatus,
    setDefaultStatus,
    nextStatus,
  }
}
