<template>
  <NotificationModal v-model="notifModal" />
  <main>
    <div class="container">
      <CurrentTask :time="time" :maxTime="currentTab.time"></CurrentTask>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" />
        <div class="timer" v-text="timer"></div>
        <div class="button-wrapper">
          <button v-if="timeInterval" @click="stopTimer">stop</button>
          <button v-else-if="time === 0" @click="nextStatus">next</button>
          <button v-else @click="startTimer">start</button>
        </div>
      </div>
      <Tasks></Tasks>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Component, computed, defineAsyncComponent, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { TabI } from "@/components/Tab.vue"
import { useStatus } from "@/composable/status"

const Route = useRoute()
const { setDefaultStatus, setStatus, status } = useStatus()

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

const task = ref<string>(
  Route.query.task?.toString() || "work on the pomodoro project"
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
  timeInterval.value = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timeInterval.value)
      timeInterval.value = 0
      alertSound.play()
      new Notification("Time is over !!!", {
        body: "Go to the next step",
        timestamp: 3000,
      })
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

const Tab: Component = defineAsyncComponent(
  () => import("@/components/Tab.vue")
)

const CurrentTask: Component = defineAsyncComponent(
  () => import("@/components/CurrentTask.vue")
)

const NotificationModal: Component = defineAsyncComponent(
  () => import("@/components/NotificationModal.vue")
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
      .button-wrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
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
      }

      .timer {
        padding: 50px 0px;
        font-family: "clockicons";
        font-size: 128px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
