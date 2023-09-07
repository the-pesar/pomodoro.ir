<template>
  <main class="pmdr w-full min-h-screen">
    <Navbar />
    <div
      class="mx-auto w-12/12 md:w-10/12 lg:w-7/12 xl:w-6/12 2xl:w-4/12 py-5 px-3 md:px-10">
      <SelectedTask />
      <section class="bg-glass mt-2.5 rounded-lg">
        <div class="flex text-white cursor-pointer">
          <div
            class="flex justify-center items-center flex-col md:flex-row w-1/3 pt-2 md:p-4"
            :class="activeTab === 'focus' && 'active-tab rounded-tr-lg'"
            @click="activeTab = 'focus'">
            <img class="w-[22px]" src="@/assets/icons/brain.svg" alt="charge" />
            <span class="my-2 md:my-0 md:mx-2">تمرکز</span>
          </div>
          <div
            class="flex justify-center items-center flex-col md:flex-row w-1/3 pt-2 md:p-4"
            :class="activeTab === 'short-break' && 'active-tab'"
            @click="activeTab = 'short-break'">
            <img
              class="w-[22px]"
              src="@/assets/icons/muffin.svg"
              alt="charge" />
            <div class="my-2 md:my-0 md:mx-2 text-center">
              <span>استراحت</span>
              <span class="text-xs"> کوتاه</span>
            </div>
          </div>
          <div
            class="flex justify-center items-center flex-col md:flex-row w-1/3 pt-2 md:p-4"
            :class="activeTab === 'long-break' && 'active-tab rounded-tl-lg'"
            @click="activeTab = 'long-break'">
            <img
              class="w-[22px]"
              src="@/assets/icons/lightning-charge-fill.svg"
              alt="charge" />
            <div class="my-2 md:my-0 md:mx-2 text-center">
              <span>استراحت</span>
              <span class="text-xs"> طولانی</span>
            </div>
          </div>
        </div>
      </section>
      <section
        class="flex flex-col bg-glass mt-2.5 pt-10 rounded-lg font-['clockicons'] text-white text-center">
        <span class="text-[130px] md:text-[150px]">{{ countdownTimer }}</span>
        <div class="py-10">
          <button
            v-if="!timing"
            class="timer-action bg-white w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg"
            @click="startTimerAction">
            <div class="flex justify-center items-center">
              <span class="mx-1">بریم</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 10.0001V14.0001H11L14.5 17.5001L12.08 19.9201L4.15997 12.0001L12.08 4.08008L14.5 6.50008L11 10.0001H20Z"
                  fill="currentColor" />
              </svg>
            </div>
          </button>
          <template v-else>
            <button
              class="timer-action bg-white w-[150px] md:w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg ml-2.5"
              @click="restTimer">
              <div class="flex justify-center items-center">
                <span class="mx-1">دوباره</span>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 8L15 12H18C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C11 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12H23L19 8ZM6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6C13 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12H1L5 16L9 12"
                    fill="currentColor" />
                </svg>
              </div>
            </button>
            <button
              class="timer-action bg-white w-[150px] md:w-[180px] h-[60px] text-xl font-['Vazirmatn'] rounded-lg mr-2.5"
              @click="stopTimer">
              <div class="flex justify-center items-center">
                <span class="mx-1">مکث</span>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 19H18V5H14V19ZM6 19H10V5H6V19Z"
                    fill="currentColor" />
                </svg>
              </div>
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
            ref="newTaskInput"
            placeholder="یه اسم برای کار جدید بنویس..."
            @keypress.enter="createTaskAction" />
          <button
            class="bg-glass py-2 px-5 m-3 rounded-lg text-white outline-none"
            @click="createTaskAction">
            <div class="flex justify-center items-center">
              <span class="mx-1">ساختن</span>
              <img class="w-[22px]" src="@/assets/icons/feather.svg" alt="" />
            </div>
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
                width="35"
                alt="Close" />
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
              <div
                class="bg-glass px-3 pt-1 rounded-lg text-lg hidden md:block"
                v-text="t.focus"></div>
              <span class="mx-3" v-text="t.name"></span>
            </div>
            <div class="flex mt-4 md:mt-0">
              <div
                class="bg-glass px-3 pt-1 ml-2 rounded-lg text-lg md:hidden"
                v-text="t.focus"></div>
              <button
                class="bg-glass py-1 px-3 rounded-lg text-white outline-none ml-1"
                @click="selectTaskAction(t.id)">
                <div class="flex justify-center items-center">
                  <template v-if="t.selected">
                    <span class="mx-1">انتخاب‌شده</span>
                    <img
                      class="w-[22px]"
                      src="@/assets/icons/rocket-sharp.svg"
                      alt="rocket" />
                  </template>
                  <template v-else>
                    <span class="mx-1">انتخاب</span>
                    <img
                      class="w-[22px]"
                      src="@/assets/icons/rocket-outline.svg"
                      alt="rocket" />
                  </template>
                </div>
              </button>
              <div
                class="edit bg-glass p-2 mx-1 rounded-lg cursor-pointer"
                @click="editingTasks.push(t.id)">
                <img
                  class="cursor-pointer"
                  src="@/assets/icons/edit.svg"
                  width="18"
                  alt="Edit" />
              </div>
              <div
                class="delete bg-glass p-2 mr-1 rounded-lg cursor-pointer"
                @click="deleteTaskAction(t.id)">
                <img
                  class="cursor-pointer"
                  src="@/assets/icons/trash-fill.svg"
                  width="18"
                  alt="Delete" />
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

const route = useRoute()

const newTaskInput = ref<HTMLInputElement>()

const { time, countdownTimer, startTimer, stopTimer, restTimer, timing } =
  useTimer()
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

onMounted(() => {
  newTask.value = route.query['new-task'] as string
  newTaskInput.value?.focus()
})
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
  color: rgba(255, 255, 255, 0.5);
}

.delete:active,
.edit:active {
  transform: scale(0.9);
}

svg {
  color: var(--status-color);
}
</style>
