<template>
  <div class="elevation-1 pa-4 my-4">
    <v-text-field :value="condition.var" label="Condition" filled />
    <p>If True:</p>
    <questionnaire-result-computation-case :value="ifTrue" />
    <p>If False:</p>
    <questionnaire-result-computation-case :value="ifFalse" />
  </div>
</template>

<script>
const QuestionnaireResultComputationCase = () =>
  import('~/components/questionnaire/resultComputationCase')

export default {
  name: 'QuestionnaireResultComputationNode',
  components: { QuestionnaireResultComputationCase },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    condition() {
      return this.value.if[0]
    },
    ifTrue() {
      return this.value.if[1]
    },
    ifFalse() {
      return this.value.if[2]
    }
  }
}
</script>
