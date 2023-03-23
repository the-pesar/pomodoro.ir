type TimeLength = "focus" | "short-break" | "long-break";
type ITaskTime = Extract<keyof ITask, 'shortBreak' | 'longBreak' | 'focus'>