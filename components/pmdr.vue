<template>
  <main class="pmdr w-full min-h-screen">
    <div
      class="mx-auto w-12/12 md:w-10/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 py-5 px-3 md:px-10">
      <SelectedTask />
      <section class="bg-glass mt-2.5 rounded-lg">
        <div class="flex text-white cursor-pointer">
          <div
            class="w-1/3 text-center p-4"
            :class="activeTab === 'focus' && 'active-tab rounded-tr-lg'"
            @click="activeTab = 'focus'">
            <span>تمرکز</span>
          </div>
          <div
            class="w-1/3 text-center p-4"
            :class="activeTab === 'short-break' && 'active-tab'"
            @click="activeTab = 'short-break'">
            <span>استراحت</span>
            <span class="text-xs"> کوتاه</span>
          </div>
          <div
            class="w-1/3 text-center p-4"
            :class="activeTab === 'long-break' && 'active-tab rounded-tl-lg'"
            @click="activeTab = 'long-break'">
            <span>استراحت</span>
            <span class="text-xs"> طولانی</span>
          </div>
        </div>
      </section>
      <section
        class="flex flex-col bg-glass mt-2.5 pt-10 rounded-lg font-['clockicons'] text-white text-center">
        <span class="text-[130px] md:text-[150px]">{{ timer }}</span>
        <div class="py-10">
          <button
            v-if="!timing"
            class="timer-action bg-white w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg"
            @click="startTimerAction">
            بریم
          </button>
          <template v-else>
            <button
              class="timer-action bg-white w-[150px] md:w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg ml-2.5"
              @click="restTimer">
              دوباره
            </button>
            <button
              class="timer-action bg-white w-[150px] md:w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg mr-2.5"
              @click="stopTimer">
              مکث
            </button>
          </template>
        </div>
      </section>
      <section class="mt-4">
        <div class="bg-glass flex justify-between rounded-lg">
          <input
            v-model="newTask"
            class="bg-transparent outline-none h-[64px] w-full rounded-lg px-3 text-white border-r-8"
            type="text"
            placeholder="یه اسم برای کار جدید بنویس..."
            @keypress.enter="createTaskAction" />
          <button
            class="bg-glass py-2 px-4 m-3 rounded-lg text-white outline-none"
            @click="createTaskAction">
            ساختن
          </button>
        </div>
        <template v-for="t in tasks" :key="t.id">
          <div
            v-if="editingTasks.some((v) => v === t.id)"
            class="bg-glass flex justify-between rounded-lg border-r-8 text-white mt-4">
            <input
              v-model="t.name"
              class="bg-transparent outline-none h-[64px] w-full rounded-lg px-4 text-white"
              type="text"
              @keypress.enter="editTaskAction(t.id, t.name)"
              v-focus />
            <button
              class="dit bg-glass p-1 my-4 mx-2 rounded-lg cursor-pointer"
              @click="
                editingTasks.splice(
                  editingTasks.findIndex((v) => v === t.id),
                  1
                )
              ">
              <img
                class="cursor-pointer"
                src="@/assets/icons/close.svg"
                width="35" />
            </button>
            <button
              class="bg-glass py-1 px-3 rounded-lg text-white outline-none my-4 ml-4"
              @click="editTaskAction(t.id, t.name)">
              ویرایش
            </button>
          </div>
          <div
            v-else
            class="expand-animation bg-glass flex flex-col items-center md:justify-between md:flex-row rounded-lg border-r-8 text-white p-4 mt-4">
            <div class="flex items-center">
              {{ t.name }}
            </div>
            <div class="flex mt-4 md:mt-0">
              <button
                class="bg-glass py-1 px-3 rounded-lg text-white outline-none ml-1"
                @click="selectTaskAction(t.id)">
                <span v-if="t.selected">انتخاب‌شده</span>
                <span v-else>انتخاب</span>
              </button>
              <div
                class="edit bg-glass p-2 mx-1 rounded-lg cursor-pointer"
                @click="editingTasks.push(t.id)">
                <img
                  class="cursor-pointer"
                  src="@/assets/icons/edit.svg"
                  width="18" />
              </div>
              <div
                class="delete bg-glass p-2 mr-1 rounded-lg cursor-pointer"
                @click="deleteTaskAction(t.id)">
                <img
                  class="cursor-pointer"
                  src="@/assets/icons/trash-fill.svg"
                  width="18" />
              </div>
            </div>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { useTimer } from '~/composables/Timer'
import { useStatus } from '~/composables/Status'
import { useTasks } from '~/composables/Tasks'
import { useNotif } from '~/composables/Notif'

const { error } = useNotif()

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
}
const { time, timer, startTimer, stopTimer, restTimer, timing } = useTimer()
const { status, setStatus } = useStatus()
const { tasks, createTask, deleteTask, selectTask, editTask, selectedTask } =
  useTasks()

const newTask = ref<string>('')
const editingTasks = ref<string[]>([])

const activeTab = computed({
  get: () => {
    return status.value?.name as TimeLength
  },
  set: (newTab: TimeLength) => {
    setStatus(newTab)
    restTimer()
    time.value = status.value?.time as number
  },
})

const createTaskAction = () => {
  if (!newTask.value) return
  createTask(newTask.value)
  newTask.value = ''
}

const editTaskAction = (id: string, newName: string) => {
  editTask(id, newName)
  editingTasks.value.splice(
    editingTasks.value.findIndex((v) => v === id),
    1
  )
}

const startTimerAction = () => {
  if (tasks.value.find((v) => v.selected)) startTimer()
  else error('اول از همه یه کار جدید بساز و انتخاب کن!')
}

const deleteTaskAction = (id: string) => {
  deleteTask(id)
  restTimer()
}

const selectTaskAction = (id: string) => {
  if (selectedTask.value?.id === id) return
  selectTask(id)
  restTimer()
}
</script>

<style>
.active-tab {
  background-color: hsla(0, 0%, 100%, 0.15);
  border-bottom: 2.5px solid #fff;
}

button:active {
  transform: scale(0.95);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.delete:active,
.edit:active {
  transform: scale(0.9);
}
</style>
