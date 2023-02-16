<template>
  <Modal v-model="notifModal">
    <template #title>Notification Permission</template>
    <template #body>
      <p>Please give us notification access for better user experience</p>
      <div class="flex justify-end">
        <button class="notif-btn mt-5" @click="notificationRequest">
          Ok, thanks
        </button>
      </div>
    </template>
  </Modal>
  <main>
    <div class="container">
      <CurrentTask :time="time" :maxTime="currentTab.time"></CurrentTask>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" />
        <div class="timer" v-text="timer"></div>
        <div class="flex justify-center pb-8">
          <button v-if="timeInterval" @click="stopTimer">stop</button>
          <button v-else-if="time === 0" @click="nextStatus">next</button>
          <button v-else @click="startTimer">start</button>
          <button v-show="timeInterval" @click="restartTimer">rest</button>
        </div>
      </div>
      <Tasks></Tasks>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Component, computed, defineAsyncComponent, ref, watch } from "vue"
import { TabI } from "@/components/Tab.vue"
import { useStatus } from "@/composable/status"
import { useTasks } from "@/composable/tasks"

const { setDefaultStatus, setStatus, status } = useStatus()
const { selectedTask, updateTask } = useTasks()

setDefaultStatus()

const tabs: TabI[] = [
  {
    name: "focus",
    text: "Focus",
    time: 1500, // 1500
  },
  {
    name: "short-break",
    text: "Short Break",
    time: 300, // 300
  },
  {
    name: "long-break",
    text: "Long Break",
    time: 900, // 900
  },
]

const currentTab = ref<TabI>(
  tabs.find((v) => v.name === status.value) || tabs[0]
)

const alertSound: HTMLAudioElement = new Audio("/sounds/alarm-bell.mp3")

const time = ref<number>(currentTab.value.time) // 25:00 => 1500 | 05:00 => 300 | 15:00 => 900

const notifModal = ref<boolean>(false)

if (Notification.permission === "default") {
  setTimeout(() => {
    notifModal.value = true
  }, 2 * 1000)
}

let timeInterval = ref<number>()

const timer = computed<string>(() => {
  let m: number | string = Math.trunc(time.value / 60)
  let s: number | string = time.value % 60

  if (m < 10) m = `0${m}`
  if (s < 10) s = `0${s}`

  return `${m}:${s}`
})

watch(currentTab, (newTab: TabI) => {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
  time.value = newTab.time
  setStatus(newTab.name)
})

const startTimer = () => {
  // if (!selectedTask.value) return
  timeInterval.value = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timeInterval.value)
      timeInterval.value = 0
      alertSound.play()
      new Notification("Time is over !!!", {
        body: "Go to the next step",
        timestamp: 3000,
      })
      updateTask(selectedTask.value?.id as string, currentTab.value.name)
      nextStatus()
    } else {
      time.value--
      document.title = `${timer.value} - ${currentTab.value.text}`
    }
  }, 1 * 1000)
}

const stopTimer = () => {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
}

const nextStatus = () => {
  switch (currentTab.value.name) {
    case "focus":
      setStatus("short-break")
      currentTab.value = tabs[1]
      break
    case "short-break":
      setStatus("long-break")
      currentTab.value = tabs[2]
      break
    case "long-break":
      setStatus("focus")
      currentTab.value = tabs[0]
      break

    default:
      throw new Error("switch case default !!!")
  }
}

const restartTimer = () => {
  stopTimer()
  time.value = currentTab.value.time
  document.title = `${timer.value} - ${currentTab.value.text}`
}

const notificationRequest = () => {
  Notification.requestPermission().finally(() => {
    notifModal.value = false
  })
}

const Tab: Component = defineAsyncComponent(
  () => import("@/components/Tab.vue")
)

const CurrentTask: Component = defineAsyncComponent(
  () => import("@/components/CurrentTask.vue")
)

const Modal: Component = defineAsyncComponent(
  () => import("@/components/Modal.vue")
)
const Tasks: Component = defineAsyncComponent(
  () => import("@/components/Tasks.vue")
)
</script>

<style lang="scss">
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
  .container {
    width: 530px;
    @media screen and (max-width: 640px) {
      width: 380px;
    }
    .timer-wrapper {
      margin-top: 20px;
      border-radius: 5px;
      background-color: var(--bg-glass);
      button {
        outline: none;
        border: none;
        font-size: 21px;
        border-radius: 5px;
        font-family: "Poppins", sans-serif, system-ui;
        cursor: pointer;
        width: 180px;
        height: 60px;
        color: var(--status-color);
        background-color: #fff;
        text-transform: uppercase;
        transition: color 0.5s;
        margin: 0 5px;
        &:active {
          transform: scale(0.95);
        }
      }

      .timer {
        padding: 30px 0px;
        font-family: "clockicons";
        font-size: 128px;
        color: #fff;
        text-align: center;
      }
    }
  }
}

.notif-btn {
  background-color: var(--status-color);
  border: none;
  outline: none;
  padding: 10px 20px;
  font-family: "Poppins", sans-serif, system-ui;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
}
</style>
