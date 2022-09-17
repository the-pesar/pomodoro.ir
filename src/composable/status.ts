import { ref, watch } from "vue"

export type StatusType = "focus" | "short-break" | "long-break"

const status = ref<StatusType>("focus")
const statusColors = {
  focus: "#d95550",
  "short-break": "#4c9195",
  "long-break": "#457ca3",
}

function setStatus(newStatus: StatusType) {
  status.value = newStatus
  document.body.setAttribute("status", status.value)
  document.head
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", statusColors[newStatus])
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
