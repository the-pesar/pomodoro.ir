<template>
  <section
    class="relative bg-glass text-center p-5 text-lg text-white rounded-lg capitalize">
    <span> {{ selectedTask?.name || 'هنوز هیچ کاری انتخاب نشده!' }}</span>
    <div
      class="transition-width absolute top-0 left-0 bg-glass rounded-lg h-full"
      :style="{ width: progressWidth }"></div>
  </section>
</template>
<script lang="ts" setup>
import { useTasks } from '~/composables/Tasks'
import { useTimer } from '~/composables/Timer'
import { useStatus } from '~/composables/Status'

const { selectedTask } = useTasks()
const { time } = useTimer()
const { status } = useStatus()

const progressWidth = computed<string>(
  () => `${100 - (time.value / status.value.time) * 100}%`
)
</script>
