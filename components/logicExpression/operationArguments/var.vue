<template>
  <v-text-field :value="value" filled />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
