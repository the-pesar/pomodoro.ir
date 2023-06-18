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
  color: Color
  active: boolean
}

interface ITime {
  start: number
  end: number
}