import { useStatus } from '~/composables/Status'

const { status, nextStatus } = useStatus()

const alertSound: HTMLAudioElement | null = ((isClient) =>
  isClient ? new Audio('/sounds/alarm-bell.mp3') : null)(process.client)

const time = ref<number>(status.value?.time ?? 0)

const counting = ref<boolean>(false)

const timer = computed<string>(() => {
  let m: number | string = Math.trunc(time.value / 60)
  let s: number | string = time.value % 60

  if (m < 10) m = `0${m}`
  if (s < 10) s = `0${s}`

  return `${m}:${s}`
})

function startTimer() {
  function timerInterval() {
    if (!counting.value) return
    time.value--
    useHead({ title: `${timer.value} - ${status.value?.text}` })
    if (time.value === 0) {
      alertSound?.play()
      stopTimer()
      nextStatus()
      time.value = status.value?.time as number
      startTimer()
    }
    setTimeout(timerInterval, 1000)
  }
  counting.value = true
  setTimeout(timerInterval, 1000)
}

function stopTimer() {
  counting.value = false
}

function restTimer() {
  stopTimer()
  time.value = status.value?.time ?? 0
  useHead({ title: 'پومودورو' })
}

const timing = computed<boolean>(() => !!counting.value)

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
