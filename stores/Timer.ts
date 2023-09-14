import { useTasksStore } from '@/stores/Tasks'

export const useTimerStore = defineStore('timer', () => {
  const alertSound: HTMLAudioElement | null = ((isClient) =>
    isClient ? new Audio('/sounds/alarm-bell.mp3') : null)(process.client)

  const timeSequence = ref<ITime[]>([])
  const timing = ref<boolean>(false)

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
  const timer = computed<string>(() => {
    let m: number | string = Math.trunc(time.value / 60)
    let s: number | string = time.value % 60

    if (m < 10) m = `0${m}`
    if (s < 10) s = `0${s}`

    return `${m}:${s}`
  })

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
    const tasksStore = useTasksStore()
    const { selectedTask } = storeToRefs(tasksStore)

    if (!selectedTask.value) return
    switch (status.value?.name) {
      case 'focus':
        tasksStore.update(selectedTask.value.id, 'focus')
        if (selectedTask.value.focus % 4 === 0) {
          setStatus('long-break')
        } else {
          setStatus('short-break')
        }
        break
      case 'short-break':
        tasksStore.update(selectedTask.value.id, 'shortBreak')
        setStatus('focus')
        break
      case 'long-break':
        tasksStore.update(selectedTask.value.id, 'longBreak')
        setStatus('focus')
        break
      default:
        break
    }
  }

  const setDefaultStatus = () => setStatus('focus')

  function start() {
    timing.value = true
    useHead({ title: `${status.value?.text}` })
    const startTime = new Date().getTime()
    timeSequence.value.push({ start: startTime, end: startTime })
    function timerInterval() {
      if (!timing.value) return
      timeSequence.value[timeSequence.value.length - 1].end =
        new Date().getTime()
      if (time.value <= 0) {
        alertSound?.play()
        rest()
        nextStatus()
        start()
      }
      setTimeout(timerInterval, 1000)
    }
    timerInterval()
  }

  function stop() {
    timing.value = false
  }

  function rest() {
    stop()
    timeSequence.value = []
    useHead({ title: 'پومودورو' })
  }

  setDefaultStatus()

  return { time, timer, timing, status, start, stop, rest, setStatus }
})
