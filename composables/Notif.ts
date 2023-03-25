const show = ref(false)
const text = ref('')
let timeout: number = 0
export function useNotif() {
  function error(errorText: string) {
    timeout && clearTimeout(timeout)
    text.value = errorText
    show.value = true
    timeout = setTimeout(() => {
      show.value = false
    }, 5000)
  }
  return { error, show, text }
}
