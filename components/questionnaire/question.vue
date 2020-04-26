<template>
  <div>
    <v-text-field label="Id" outlined :value="question.id" />
    <v-textarea label="Description" outlined :value="question.description" />
    <v-select label="Type" outlined :value="question.type" :items="types" />
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireQuestion',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      types: [
        {
          text: 'Ja/Nein',
          value: 'boolean'
        }
      ]
    }
  }
}
</script>
