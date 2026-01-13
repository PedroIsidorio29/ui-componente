<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <q-input 
      class="q-mx-md" 
      clear-icon="close" 
      :model-value="modelValue"
      :label="label" 
      :error="!!errors" 
      :mask="mask"
      :disable="disable"
      :maxlength="maxLength"
      :error-message="errors"
      clearable 
      dense
      no-error-icon
      @update:model-value="update"
    />
  </div>
</template>

<script setup lang="ts">
import type { TInput } from "@/utils/input-type.ts";
import { computed, toRefs } from "vue";

const props = defineProps<
  TInput<string | null> & {
    errors?: string
    disable?: boolean
  }
>()

const label = computed(() => `${props.nome ?? ""} ${props.obrigatorio ? '*' : ''}`)

const { errors } = toRefs(props)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()


function update(value: string | null) {
  emit('update:modelValue', value === '' ? null : value)
}

</script>
