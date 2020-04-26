<template>
  <div>
    Expression List
    <div v-for="(item, index) of value" :key="index">
      <logic-expression-editor :value="item">
        <v-btn slot="after">Remove</v-btn>
      </logic-expression-editor>
    </div>
    <v-btn>Add</v-btn>
  </div>
</template>

<script>
import LogicExpressionEditor from '~/components/logicExpression/editor'
export default {
  name: 'LogicExpressionList',
  components: { LogicExpressionEditor },
  props: {
    value: {
      type: Array,
      required: true
    }
  }
}
</script>
