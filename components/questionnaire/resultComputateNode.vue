<template>
  <div class="elevation-1 pa-4 my-4">
    <v-text-field :value="condition.var" label="Condition" filled />
    <p>If True:</p>
    <questionnaire-result-compute-case :value="ifTrue" />
    <p>If False:</p>
    <questionnaire-result-compute-case :value="ifFalse" />
  </div>
</template>

<script>
const QuestionnaireResultComputeCase = () =>
  import('~/components/questionnaire/resultComputeCase')

export default {
  name: 'QuestionnaireResultComputeNode',
  components: { QuestionnaireResultComputeCase },
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
