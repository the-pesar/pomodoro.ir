<template>
  <section
    class="relative bg-glass text-center p-5 text-lg text-white rounded-lg capitalize">
    <span> {{ selected?.name || 'هنوز هیچ کاری انتخاب نشده!' }}</span>
    <div
      class="progress absolute top-0 left-0 bg-glass rounded-lg h-full"></div>
  </section>
</template>
<script lang="ts" setup>
import { useTimerStore } from '~/stores/Timer'
import { useTasksStore } from '~/stores/Tasks'

const timerStore = useTimerStore()
const tasksStore = useTasksStore()

const { status, time } = storeToRefs(timerStore)
const { selected } = storeToRefs(tasksStore)

const progress = computed<string>(() => {
  return `${100 - (time.value / status.value.time) * 100}%`
})
</script>

<style scoped>
.progress {
  width: v-bind(progress);
  transition: width 0.5s;
}
</style>
