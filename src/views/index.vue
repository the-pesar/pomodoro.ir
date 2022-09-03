<template>
  <main>
    <div class="container">
      <div class="task-wrapper">
        <span class="task" v-text="task"></span>
      </div>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" @change="tabChange" />
        <div class="timer" v-text="timer"></div>
        <Button>start</Button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Component, computed, defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { TabI } from "@/components/Tab.vue";

const Routes = useRoute();

const Tab: Component = defineAsyncComponent(
  () => import("@/components/Tab.vue")
);

const Button: Component = defineAsyncComponent(
  () => import("@/components/Button.vue")
);

const tabs: TabI[] = [
  {
    name: "focus",
    text: "Focus",
  },
  {
    name: "short-break",
    text: "Short Break",
  },
  {
    name: "long-break",
    text: "Long Break",
  },
];

const currentTab = ref<TabI>(tabs[0]);

const task = ref<string>(
  Routes.query.task?.toString() || "work on the pomodoro project"
);
const time = ref<number>(1500); // 25:00 => 1500 | 05:00 => 300 | 15:00 => 900

const timer = computed(() => {
  if (time.value === 0) return "00:00";

  let m: number | string = Math.trunc(time.value / 60);
  let s: number | string = time.value % 60;

  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;

  return `${m}:${s}`;
});

const tabChange = (newTab: TabI) => {
  console.log(newTab);
  switch (newTab.name) {
    case 'focus':
      time.value = 1500; 
      break;
    case 'short-break': 
      time.value = 300; 
      break;
    case 'long-break': 
      time.value = 900;
      break;
    default:

      break;
  }
};

const timeInterval: number = setInterval(() => {
  if (time.value === 0) return clearInterval(timeInterval);
  time.value--;
}, 1000);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;

  .container {
    .task-wrapper {
      background-color: $glass-bg;
      text-align: center;
      padding: 10px 0px;
      border-radius: 5px;
      /* border: 2.5px dashed $glass-bg; */

      .task {
        color: $secondary-color;
        // font-weight: 600;
        text-transform: capitalize;
        font-size: 20px;
      }
    }

    .timer-wrapper {
      margin-top: 30px;
      border-radius: 5px;
      background-color: $glass-bg;

      .timer {
        padding: 40px 80px;
        font-family: "clockicons";
        font-size: 128px;
        color: $secondary-color;
      }
    }
  }
}
</style>
