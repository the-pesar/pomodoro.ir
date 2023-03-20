import { useTasks } from "~/composables/Tasks"

const { tasks, updateTask } = useTasks()

export interface StatusI {
  name: "focus" | "short-break" | "long-break"
  text: string
  time: number
  color: "#ba4949" | "#61764b" | "#2f5d62"
  active: boolean
}

const status = computed<StatusI | undefined>(() =>
  statuses.value.find((v) => v.active)
)

const statuses = ref<StatusI[]>([
  {
    name: "focus",
    text: "Focus",
    time: 1500, // 1500
    color: "#ba4949",
    active: false,
  },
  {
    name: "short-break",
    text: "Short Break",
    time: 300, // 300,
    color: "#61764b",
    active: false,
  },
  {
    name: "long-break",
    text: "Long Break",
    time: 900, // 900
    color: "#2f5d62",
    active: false,
  },
])

function setStatus(newStatus: "focus" | "short-break" | "long-break") {
  statuses.value = statuses.value.map((v) => {
    if (v.name === newStatus) v.active = true
    else v.active = false
    return v
  })
  if (process.client) document.body.setAttribute("status", newStatus)
  if (process.client) {
    document.head
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", status.value?.color as string)
  }
}

function nextStatus() {
  const i = tasks.value.findIndex((v) => v.selected)
  switch (status.value?.name) {
    case "focus":
      updateTask(tasks.value[i].id, "focus")
      console.log(tasks.value[i].focus % 4)
      if (tasks.value[i].focus % 4 === 0) {
        setStatus("long-break")
      } else {
        setStatus("short-break")
      }
      break
    case "short-break":
      updateTask(tasks.value[i].id, "shortBreak")
      setStatus("focus")
      break
    case "long-break":
      updateTask(tasks.value[i].id, "longBreak")
      setStatus("focus")
      break
    default:
      break
  }
}

const setDefaultStatus = () => setStatus("focus")

setDefaultStatus()

export function useStatus() {
  return {
    status,
    setStatus,
    setDefaultStatus,
    nextStatus,
  }
}
