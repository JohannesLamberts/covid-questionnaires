<template>
  <div>
    <v-text-field label="Id" outlined :value="question.id" />
    <v-textarea label="Beschreibung" outlined :value="question.description" />
    <v-select label="Typ" outlined :value="question.type" :items="types" />
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
