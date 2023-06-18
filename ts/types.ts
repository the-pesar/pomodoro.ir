type TimeLength = "focus" | "short-break" | "long-break";
type ITaskTime = Extract<keyof ITask, 'shortBreak' | 'longBreak' | 'focus'>
type Color = '#ba4949' | '#61764b' | '#2f5d62'