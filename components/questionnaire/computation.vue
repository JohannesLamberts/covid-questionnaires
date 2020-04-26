<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ value.id }}</span>
    </v-card-title>
    <v-card-text>
      <v-textarea label="Description" rows="2" :value="value.description" />
      <logic-expression-editor :value="value.value" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LogicExpressionEditor from '~/components/logicExpression/editor'
export default {
  name: 'QuestionnaireComputation',
  components: { LogicExpressionEditor },
  props: {
    initialValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: { ...this.initialValue }
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit('save', this.value)
    }
  }
}
</script>
