import type { App } from 'vue'

import InputText from './input/input-text.vue'
import InputSelect from './input/input-select.vue'
import InputDate from './input/input-date.vue'
import InputDateRange from './input/input-date-range.vue'
import InputNumber from './input/input-number.vue'

// exports nomeados
export const DPMGInputText = InputText
export const DPMGInputSelect = InputSelect
export const DPMGInputDateRange = InputDateRange
export const DPMGInputDate = InputDate
export const DPMGInputNumber = InputNumber

const components = {
  DPMGInputText,
  DPMGInputSelect,
  DPMGInputDateRange,
  DPMGInputDate,
  DPMGInputNumber
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}
