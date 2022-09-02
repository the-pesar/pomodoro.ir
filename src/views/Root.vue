<template>
  <main>
    <div class="container">
      <div class="task-wrapper">
        <span class="task" v-text="task"></span>
      </div>
      <div class="timer-wrapper">
        <Tab v-model="currentTab" :tabs="tabs" />
        <div class="timer" v-text="timer"></div>
        <Button>START</Button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Component, defineAsyncComponent, ref } from "vue";
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
    text: "Short Break",
  },
];

const currentTab = ref<TabI>(tabs[0]);

const timer = ref<string>("30:54");
const task = ref<string>(
  Routes.query.task?.toString() || "work on the pomodoro project"
);
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
