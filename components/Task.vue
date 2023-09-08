<script lang="ts" setup>
import { useTasksStore } from '~/stores/Tasks'
import { useTimerStore } from '~/stores/Timer'

const props = defineProps<{
  id: string
  name: string
  selected: boolean
  focus: number
  shortBreak: number
  longBreak: number
}>()

const tasksStore = useTasksStore()
const timerStore = useTimerStore()

const editmode = ref<boolean>()
const newName = ref<string>('')

function editHandler() {
  tasksStore.edit(props.id, newName.value)
  editmode.value = false
  newName.value = ''
  timerStore.rest()
}

function selectHandler() {
  !props.selected && tasksStore.select(props.id) && timerStore.rest()
}

function deleteHandler() {
  tasksStore.remove(props.id) && props.selected && timerStore.rest()
}
</script>
<template>
  <div
    v-if="!editmode"
    class="expand-animation bg-glass flex flex-col items-center md:justify-between md:flex-row rounded-lg border-r-8 text-white p-4 mt-4 cursor-pointer"
    @click.self="selectHandler">
    <div class="flex items-center" @click="selectHandler">
      <img
        v-if="selected"
        class="w-[32px]"
        src="@/assets/icons/checkmark-circle.svg"
        alt="rocket" />
      <img
        v-else
        class="w-[32px]"
        src="@/assets/icons/radio-button-off-outline.svg"
        alt="rocket" />
      <span class="mx-3" v-text="name"></span>
    </div>
    <div class="flex mt-4 md:mt-0">
      <div
        class="bg-glass px-3 pt-1 ml-2 rounded-lg text-lg md:hidden"
        v-text="focus"></div>
      <div
        class="edit bg-glass p-2 mx-1 rounded-lg cursor-pointer"
        @click="() => (editmode = true) && (newName = name)">
        <img
          class="cursor-pointer"
          src="@/assets/icons/edit.svg"
          width="18"
          alt="edit" />
      </div>
      <div class="delete bg-glass p-2 mx-1 rounded-lg cursor-pointer">
        <img
          class="cursor-pointer"
          src="@/assets/icons/bookmark-fill.svg"
          width="18"
          alt="archive" />
      </div>
      <div
        class="delete bg-glass p-2 mr-1 rounded-lg cursor-pointer"
        @click="deleteHandler">
        <img
          class="cursor-pointer"
          src="@/assets/icons/trash-fill.svg"
          width="18"
          alt="Delete" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="bg-glass flex justify-between rounded-lg border-r-8 text-white mt-4">
    <input
      v-model="newName"
      class="bg-transparent outline-none h-[64px] w-full rounded-lg px-4 text-white"
      type="text"
      @keypress.enter="editHandler"
      v-focus />
    <button
      class="dit bg-glass p-1 my-4 mx-2 rounded-lg cursor-pointer"
      @click="editmode = false">
      <img
        class="cursor-pointer"
        src="@/assets/icons/close.svg"
        width="35"
        alt="Close" />
    </button>
    <button
      class="bg-glass py-1 px-3 rounded-lg text-white outline-none my-4 ml-4"
      @click="editHandler">
      ویرایش
    </button>
  </div>
</template>
