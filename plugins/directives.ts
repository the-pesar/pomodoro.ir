import { vFocus } from '@/directives'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', vFocus)
})
