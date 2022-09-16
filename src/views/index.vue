<template>
  <main>
    <div class="container">
      <Task :time="time" :maxTime="currentTab.time">{{ task }}</Task>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" @change="tabChange" />
        <div class="timer" v-text="timer"></div>
        <Button v-if="timeInterval" @click="stopTimer">stop</Button>
        <Button v-else @click="startTimer">start</Button>
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
const { setDefaultStatus, setStatus } = useStatus()

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
// must be change (hardcode)
const currentTab = ref<TabI>(tabs[0])

const task = ref<string>(
  Route.query.task?.toString() || "work on the pomodoro project"
)
// must be change (hardcode)
const time = ref<number>(1500) // 25:00 => 1500 | 05:00 => 300 | 15:00 => 900

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
    if (time.value === 0) return clearInterval(timeInterval.value)
    time.value--
  }, 1 * 1000)
}

const stopTimer = () => {
  clearInterval(timeInterval.value)
  timeInterval.value = 0
}

const Tab: Component = defineAsyncComponent(
  () => import("@/components/Tab.vue")
)

const Button: Component = defineAsyncComponent(
  () => import("@/components/Button.vue")
)

const Task: Component = defineAsyncComponent(
  () => import("@/components/Task.vue")
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
    .timer-wrapper {
      margin-top: 30px;
      border-radius: 5px;
      background-color: var(--bg-glass);

      .timer {
        padding: 40px 80px;
        font-family: "clockicons";
        font-size: 128px;
        color: #fff;
      }
    }
  }
}
</style>
