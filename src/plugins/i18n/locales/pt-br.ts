export const messages = {
  'pt-BR': {
    close: 'Fechar',
    clear: 'Limpar'
  },
  'en-US': {
    close: 'Close',
    clear: 'Clear'
  }
} as const

export type InputDateRangeLocale = keyof typeof messages
