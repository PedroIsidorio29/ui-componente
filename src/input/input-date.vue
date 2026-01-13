<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <q-input
      :model-value="dateView"
      :label="label"
      class="q-mx-md"
      clear-icon="close"
      clearable
      dense
      no-error-icon
      :error="!!errors"
      :error-message="errors"
      :disable="disable"
      @click.stop="openDatePicker"
      @clear="clearDate"
    >
      <template #append>
        <q-icon name="event" class="cursor-pointer q-ml-sm">
          <q-popup-proxy
            ref="inputDate"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :model-value="modelValue"
              today-btn
              :options="options"
              @update:model-value="update"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import type { TInput } from "@/utils/input-type"
import { QPopupProxy } from "quasar"
import { computed, ref } from "vue"

const props = defineProps<
  TInput<string | null> & {
    errors?: string
    disable?: boolean
  }
>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void
}>()

const inputDate = ref<QPopupProxy | null>(null)

/* ===========================
 * Helpers popup
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
function update(value: string | null) {
  emit("update:modelValue", value)
  closeDatePicker()
}

function clearDate() {
  emit("update:modelValue", null)
}

/* ===========================
 * Computeds
 * =========================== */
const dateView = computed(() => {
  if (!props.modelValue) return ""
  return props.modelValue.split("/").reverse().join("/")
})

const label = computed(
  () => `${props.nome ?? ""} ${props.obrigatorio ? "*" : ""}`
)
</script>
