<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <q-select
      class="q-mx-md"
      option-value="value"
      option-label="description"
      option-disable="disable"
      clear-icon="close"
      clearable
      map-options
      emit-value
      dense
      use-input
      no-error-icon
      :model-value="modelValue"
      :label="label"
      :options="optionCopy.length ? optionCopy : valores"
      :error="!!errors"
      :error-message="errors"
      :disable="disable"
      @filter="filter"
      @update:model-value="update"
    >
      <template v-if="custonSelect" #option="{ opt }">
        <slot :opt="opt" />
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import type { TInput, TListOption } from "@/utils/input-type"
import { computed, ref, toRefs } from "vue"

const props = defineProps<
  TInput<string | number | null> & {
    errors?: string
    custonSelect?: boolean
    disable?: boolean
  }
>()
const optionCopy = ref<TListOption[]>([])
const { errors } = toRefs(props)

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void
}>()

const label = computed(
  () => `${props.nome ?? ""} ${props.obrigatorio ? "*" : ""}`
)

function update(value: string | number | null) {
  emit("update:modelValue", value)
}

function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

function filterFn(
  val: string,
  update: (fn: () => void) => void,
  source: TListOption[]
) {
  if (!val) {
    update(() => (optionCopy.value = source))
    return
  }

  update(() => {
    const needle = removeAccents(val)
    optionCopy.value = source.filter(opt =>
      removeAccents(opt.description).includes(needle)
    )
  })
}

function filter(val: string, update: (fn: () => void) => void) {
  if (props.valores?.length) {
    filterFn(val, update, props.valores)
  }
}
</script>
