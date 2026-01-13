import type { App } from "vue";
import InputText from "./input/input-text.vue";
import InputSelect from "./input/input-select.vue";
import InputDate from "./input/input-date.vue";
import InputDateRange from "./input/input-date-range.vue";
import InputNumber from "./input/input-number.vue";

export const DPMGInputText = InputText;
export const DPMGInputSelect = InputSelect;
export const DPMGInputDateRange = InputDateRange;
export const DPMGInputDate = InputDate;
export const DPMGInputNumber = InputNumber;

export default {
  install(app: App) {
    app.component("DPMGInputText", InputText);
    app.component("DPMGInputSelect", InputSelect);
    app.component("DPMGInputDateRange", InputDateRange);
    app.component("DPMGInputDate", InputDate);
    app.component("DPMGInputNumber", InputNumber);
  }
};
