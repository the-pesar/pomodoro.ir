import { useStatus } from '~/composables/Status'

const { status, nextStatus } = useStatus()

const alertSound: HTMLAudioElement | null = ((isClient) =>
  isClient ? new Audio('/sounds/alarm-bell.mp3') : null)(process.client)

const timeSequence = ref<ITime[]>([])
const timing = ref<boolean>(false)

const time = computed(
  () =>
    status.value.time -
    Math.trunc(
      timeSequence.value.reduce(
        (currentValue, currentIndex) =>
          currentIndex.end - currentIndex.start + currentValue,
        0
      ) / 1000
    )
)
const countdownTimer = computed<string>(() => {
  let m: number | string = Math.trunc(time.value / 60)
  let s: number | string = time.value % 60

  if (m < 10) m = `0${m}`
  if (s < 10) s = `0${s}`

  return `${m}:${s}`
})

function startTimer() {
  timing.value = true
  useHead({ title: `${status.value?.text}` })
  const start = new Date().getTime()
  timeSequence.value.push({ start, end: start })
  function timerInterval() {
    if (!timing.value) return
    timeSequence.value[timeSequence.value.length - 1].end = new Date().getTime()
    if (time.value <= 0) {
      alertSound?.play()
      restTimer()
      nextStatus()
      startTimer()
    }
    setTimeout(timerInterval, 1000)
  }
  timerInterval()
}

function stopTimer() {
  timing.value = false
}

function restTimer() {
  stopTimer()
  timeSequence.value = []
  useHead({ title: 'پومودورو' })
}

export function useTimer() {
  return {
    time,
    countdownTimer,
    startTimer,
    stopTimer,
    restTimer,
    timing,
    timeSequence,
  }
}
