import { useStatus } from "~/composables/Status"

const { status, nextStatus } = useStatus()

const alertSound: HTMLAudioElement | null = ((isClient) =>
  isClient ? new Audio("/sounds/alarm-bell.mp3") : null)(process.client)

const time = ref<number>(status.value?.time ?? 0)

const timeInterval = ref<number | NodeJS.Timer>(0)

const timer = computed<string>(() => {
  let m: number | string = Math.trunc(time.value / 60)
  let s: number | string = time.value % 60

  if (m < 10) m = `0${m}`
  if (s < 10) s = `0${s}`

  return `${m}:${s}`
})

function startTimer() {
  timeInterval.value = setInterval(() => {
    time.value--
    useHead({ title: `${timer.value} - ${status.value?.text}` })
    if (time.value === 0) {
      alertSound?.play()
      stopTimer()
      nextStatus()
      time.value = status.value?.time as number
      startTimer()
    }
  }, 10)
}

function stopTimer() {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
}

function restTimer() {
  stopTimer()
  time.value = status.value?.time ?? 0
}

const timing = computed<boolean>(() => !!timeInterval.value)

export function useTimer() {
  return {
    time,
    timer,
    startTimer,
    stopTimer,
    restTimer,
    timing,
  }
}
