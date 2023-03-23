interface ITask {
  id: string
  name: string
  selected: boolean
  focus: number
  shortBreak: number
  longBreak: number
}

interface IStatus {
  name: TimeLength
  text: string
  time: number
  color: "#ba4949" | "#61764b" | "#2f5d62"
  active: boolean
}
