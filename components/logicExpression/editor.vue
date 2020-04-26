<template>
  <div class="elevation-1 pa-4 my-4">
    <v-select label="Operation" filled :items="items" :value="operation" />
    <component
      :is="operationComponent"
      v-if="operationComponent"
      :value="operationArguments"
    />
    <slot name="after" />
  </div>
</template>

<script>
// be sure to use async imports to resolve circular dependency
// https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
const ExpressionList = () => import('./operationArguments/expressionList')
const Var = () => import('./operationArguments/var')

const OPERATION_COMPONENTS = {
  or: ExpressionList,
  and: ExpressionList,
  var: Var
}

const OPERATION_ITEMS = [
  {
    value: 'or',
    text: 'OR'
  },
  {
    value: 'and',
    text: 'AND'
  },
  {
    value: 'var',
    text: 'Value'
  }
]

export default {
  name: 'LogicExpressionEditor',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      items: OPERATION_ITEMS
    }
  },
  computed: {
    operation() {
      // only one operation supported
      return Object.keys(this.value)[0]
    },
    operationArguments() {
      return this.value[this.operation]
    },
    operationComponent() {
      if (!this.operation) {
        return null
      }
      return OPERATION_COMPONENTS[this.operation]
    }
  }
}
</script>
