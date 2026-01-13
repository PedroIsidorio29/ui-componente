<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <q-input
      :model-value="inputValue"
      :label="label"
      clearable
      clear-icon="close"
      dense
      no-error-icon
      :error="!!errors"
      :error-message="errors"
      :class="margim ? 'q-mx-md' : ''"
      :disable="disable"
      @update:model-value="update"
    />
  </div>
</template>

<script setup lang="ts">
import type { TInput } from "@/utils/input-type"
import { computed } from "vue"

const props = defineProps<
  TInput<string | null> & {
    errors?: string
    disable?: boolean
    max?: number
    margim?: boolean
  }
>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void
}>()

/* ===========================
 * Label
 * =========================== */
const label = computed(
  () => `${props.nome ?? ""} ${props.obrigatorio ? "*" : ""}`
)

/* ===========================
 * Formatters
 * =========================== */
function formatToDecimal(value: string | null): string {
  if (!value) return "0,00"

  const numericValue =
    Number(value.toString().replace(/[^\d-]/g, "")) / 100

  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(numericValue))

  return `${numericValue < 0 ? "-" : ""}${formatted}`
}

/* ===========================
 * View value
 * =========================== */
const inputValue = computed(() => formatToDecimal(props.modelValue))

/* ===========================
 * Update handler
 * =========================== */
function update(value: string | null) {
  if (!value) {
    emit("update:modelValue", null)
    return
  }

  const numeric = value.replace(/[,.]/g, "")

  if (!Number(numeric)) return
  if (numeric.length > 15) return

  if (typeof props.max === "number") {
    emit(
      "update:modelValue",
      Number(numeric) <= props.max ? numeric : String(props.max)
    )
    return
  }

  emit("update:modelValue", numeric)
}
</script>
