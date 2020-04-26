<template>
  <div>
    <questionnaire-result-compute-node v-if="isNode" :value="value" />
    <v-text-field v-else :value="value" label="Result" filled />
  </div>
</template>

<script>
import QuestionnaireResultComputeNode from '~/components/questionnaire/resultComputateNode'

export default {
  name: 'QuestionnaireResultComputeCase',
  components: { QuestionnaireResultComputeNode },
  props: {
    value: {
      type: [Object, String],
      required: true
    }
  },
  computed: {
    isNode() {
      const { value } = this
      return Object.hasOwnProperty.call(value, 'if')
    }
  }
}
</script>
