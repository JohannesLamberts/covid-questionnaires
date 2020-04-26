<template>
  <div>
    <v-checkbox label="Result" :value="!isNode" />
    <questionnaire-result-computation-node v-if="isNode" :value="value" />
    <v-text-field v-else :value="value" label="Result" filled />
  </div>
</template>

<script>
import QuestionnaireResultComputationNode from '~/components/questionnaire/resultComputationNode'

export default {
  name: 'QuestionnaireResultComputationCase',
  components: { QuestionnaireResultComputationNode },
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
