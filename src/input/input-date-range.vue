<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <q-input
      :model-value="dateRangeView"
      :label="label"
      :class="classProps || 'q-mx-md'"
      dense
      clearable
      no-error-icon
      :error="!!errors"
      :error-message="errors"
      :disable="disable"
      @clear="clearRange"
      @focus="openDatePicker"
    >
      <template #append>
        <q-icon
          name="event"
          class="cursor-pointer q-ml-sm"
          @click="openDatePicker"
        />
      </template>

      <q-popup-proxy ref="inputDate">
        <q-date
          v-model="rangeValue"
          range
          :options="options"
          @update:model-value="updateRange"
        >
          <div class="row items-center justify-end q-gutter-sm q-pa-sm">
            <q-btn
              v-close-popup
              label="t('message.close')"
              color="grey-8"
              flat
            />
            <q-btn
              label="t('message.clear')"
              color="grey-8"
              flat
              @click="clearRange"
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import type { TInput } from "@/utils/input-type"
import type { RangeDateType } from "@/utils/range-date-type"
// import i18n from "@/controllers/plugins/i18n"
import { computed, ref, watch } from "vue"
import { QPopupProxy } from "quasar"

// const { t } = i18n.global

const props = defineProps<
  TInput<RangeDateType | null> & {
    errors?: string
    disable?: boolean
    classProps?: string
  }
>()

const emit = defineEmits<{
  (e: "update:modelValue", value: RangeDateType | null): void
}>()

/* ===========================
 * State
 * =========================== */
const inputDate = ref<QPopupProxy | null>(null)
const rangeValue = ref<RangeDateType | null>(props.modelValue)

/* ===========================
 * Label
 * =========================== */
const label = computed(
  () => `${props.nome ?? ""} ${props.obrigatorio ? "*" : ""}`
)

/* ===========================
 * Popup helpers
 * =========================== */
function openDatePicker() {
  inputDate.value?.show()
}

function closeDatePicker() {
  inputDate.value?.hide()
}

/* ===========================
 * Actions
 * =========================== */
function clearRange() {
  rangeValue.value = null
  emit("update:modelValue", null)
}

function updateRange(value: RangeDateType) {
  rangeValue.value = value
  emit("update:modelValue", value)
  closeDatePicker()
}

/* ===========================
 * View formatter
 * =========================== */
const dateRangeView = computed(() => {
  if (!rangeValue.value) return ""

  const format = (val: string) =>
    val.includes("/")
      ? val.split("/").reverse().join("/")
      : val.split("-").reverse().join("/")

  const { from, to } = rangeValue.value
  if (!from || !to) return ""

  return `${format(from)} até ${format(to)}`
})

/* ===========================
 * Sync externo
 * =========================== */
watch(
  () => props.modelValue,
  newVal => {
    rangeValue.value = newVal
  }
)
</script>
