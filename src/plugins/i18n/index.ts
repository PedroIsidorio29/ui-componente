import { useI18n } from 'vue-i18n'
import { messages } from './locales/pt-br'

export function useLocalI18n<T extends Record<string, any>>(
  locale = 'pt-BR'
) {
  return useI18n({
    useScope: 'local',
    locale,
    fallbackLocale: 'pt-BR',
    messages
  })
}
