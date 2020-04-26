<template>
  <v-data-table :headers="headers" :items="tableItems" class="question-table">
  </v-data-table>
</template>

<script>
export default {
  name: 'QuestionnaireTable',
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      questionTypes: [
        {
          text: 'Ja/Nein',
          value: 'boolean'
        }
      ],
      headers: [
        {
          text: 'Order',
          align: 'start',
          sortable: false,
          value: 'order'
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Type',
          value: 'type'
        }
      ]
    }
  },
  computed: {
    tableItems() {
      return this.questions.map((question, index) => {
        const { text: type } = this.questionTypes.find(
          (type) => type.value === question.type
        )
        const order = index + 1
        return { order, ...question, type }
      })
    }
  }
}
</script>

<style scoped></style>
