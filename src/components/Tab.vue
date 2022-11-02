<template>
  <div class="flex justify-between">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="['tab', tab.name === modelValue.name && 'active']"
      @click="$emit('update:modelValue', tab)"
    >
      <span class="text-white uppercase" v-text="tab.text"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { StatusType } from "@/composable/status";

export interface TabI {
  name: StatusType;
  text: string;
  time: number;
}

defineProps<{
  tabs: TabI[];
  modelValue: TabI;
}>();

defineEmits<{
  (e: "update:modelValue", tab: TabI): void;
}>();
</script>

<style lang="scss" scoped>
.tab {
  width: 33%;
  text-align: center;
  padding: 12px 0px;
  cursor: pointer;
}
.active {
  background-color: var(--bg-glass);
  border-bottom: 2px solid #fff;
}
</style>
