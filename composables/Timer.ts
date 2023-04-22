import { useStatus } from '~/composables/Status'

const { status, nextStatus } = useStatus()

const alertSound: HTMLAudioElement | null = ((isClient) =>
  isClient ? new Audio('/sounds/alarm-bell.mp3') : null)(process.client)

const timeSequence = ref<ITime[]>([])
const timeInterval = ref<NodeJS.Timer | number>(0)

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
  const start = new Date().getTime()
  timeSequence.value.push({ start, end: start })
  timeInterval.value = setInterval(() => {
    timeSequence.value[timeSequence.value.length - 1].end = new Date().getTime()
    useHead({ title: `${countdownTimer.value} - ${status.value?.text}` })
    if (time.value <= 0) {
      alertSound?.play()
      restTimer()
      nextStatus()
      startTimer()
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
}

function restTimer() {
  stopTimer()
  timeSequence.value = []
  useHead({ title: 'پومودورو' })
}

const timing = computed<boolean>(() => !!timeInterval.value)

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
