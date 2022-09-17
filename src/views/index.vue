<template>
  <NotificationModal v-model="notifModal" />
  <main>
    <div class="container">
      <Task :time="time" :maxTime="currentTab.time">{{ task }}</Task>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" @change="tabChange" />
        <div class="timer" v-text="timer"></div>
        <div class="button-wrapper">
          <button v-if="timeInterval" @click="stopTimer">stop</button>
          <button v-else @click="startTimer">start</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Component, computed, defineAsyncComponent, ref } from "vue"
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
    time: 1500,
  },
  {
    name: "short-break",
    text: "Short Break",
    time: 300,
  },
  {
    name: "long-break",
    text: "Long Break",
    time: 900,
  },
]
console.log(status.value)

const currentTab = ref<TabI>(
  tabs.find((v) => v.name === status.value) || tabs[0]
)

const task = ref<string>(
  Route.query.task?.toString() || "work on the pomodoro project"
)
const time = ref<number>(currentTab.value.time) // 25:00 => 1500 | 05:00 => 300 | 15:00 => 900

const notifModal = ref<boolean>(false)

console.log(Notification.permission)

if (Notification.permission === "default") {
  setTimeout(() => {
    notifModal.value = true
  }, 2000)
}

let timeInterval = ref<number>()

const timer = computed<string>(() => {
  if (time.value === 0) return "00:00"

  let m: number | string = Math.trunc(time.value / 60)
  let s: number | string = time.value % 60

  if (m < 10) m = `0${m}`
  if (s < 10) s = `0${s}`

  return `${m}:${s}`
})

const tabChange = (newTab: TabI) => {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
  time.value = newTab.time
  setStatus(newTab.name)
}

const startTimer = () => {
  timeInterval.value = setInterval(() => {
    if (time.value === 0) {
      clearInterval(timeInterval.value)
      timeInterval.value = 0
      new Audio("/songs/alarm-bell.mp3").play()
      new Notification("Time is over !!!", {
        body: "Go to the next step",
        timestamp: 3000,
      })
    } else time.value--
  }, 1 * 30)
}

const stopTimer = () => {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
}

const Tab: Component = defineAsyncComponent(
  () => import("@/components/Tab.vue")
)

const Task: Component = defineAsyncComponent(
  () => import("@/components/Task.vue")
)

const NotificationModal: Component = defineAsyncComponent(
  () => import("@/components/NotificationModal.vue")
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
    width: 500px;
    @media screen and (max-width: 640px) {
      width: 380px;
    }
    .timer-wrapper {
      margin-top: 30px;
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
