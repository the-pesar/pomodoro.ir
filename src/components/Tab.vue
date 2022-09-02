<template>
  <div class="wrapper">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      :class="['tab', tab.name === modelValue.name && 'active']"
      @click="$emit('update:modelValue', tab)"
    >
      <span v-text="tab.text"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

export interface TabI {
  name: string;
  text: string;
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
@import "@/assets/styles/variables.scss";
.wrapper {
  display: flex;
  justify-content: space-between;
  .tab {
    width: 33%;
    text-align: center;
    padding: 10px 0px;
    cursor: pointer;
    span {
      color: $secondary-color;
    }
  }
  .active {
    background-color: $glass-bg;
    border-bottom: 2px solid $secondary-color;
  }
}
</style>
