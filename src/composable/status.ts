import { ref, watch } from "vue"

export type StatusType = "focus" | "short-break" | "long-break"

const status = ref<StatusType>("focus")

function setStatus(newStatus: StatusType) {
  status.value = newStatus
  document.body.setAttribute("status", status.value)
}

const setDefaultStatus = () => setStatus("focus")

watch(status, (newValue) => setStatus(newValue))

export function useStatus() {
  return {
    status,
    setStatus,
    setDefaultStatus,
  }
}