const show = ref<boolean>(false)
const text = ref<string>('')
const timeout = ref<NodeJS.Timeout>()

export function useNotif() {
  function error(message: string) {
    timeout.value && clearTimeout(timeout.value)
    text.value = message
    show.value = true
    timeout.value = setTimeout(() => {
      show.value = false
    }, 5000)
  }
  return { error, show, text }
}
