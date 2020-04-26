<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <!-- use v-if to unmount the dialog when closed for a fresh initial value next time-->
          <v-dialog v-if="dialog" v-model="dialog" max-width="800px">
            <questionnaire-computation
              v-if="editedId"
              :initial-value="itemById(editedId)"
              @cancel="cancelEdit"
              @save="(changedItem) => saveEdit(changedItem)"
            />
          </v-dialog>
          <v-card-title><h2>Computations</h2></v-card-title>
          <v-card-text
            ><v-data-table :items="value" :headers="headers">
              <template v-slot:item.logic="{ item }">
                <pre>{{ JSON.stringify(item.value, undefined, 2) }}</pre>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title><h2>New Computation</h2></v-card-title>
          <v-card-text>
            <v-text-field v-model="newId" label="Id" />
            <v-btn color="primary" dark class="mb-2" @click="createNew"
              >Add Computation</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestionnaireComputation from '~/components/questionnaire/computation'
const HEADERS = [
  {
    text: 'Id',
    value: 'id'
  },
  {
    text: 'Description',
    value: 'description'
  },
  {
    text: 'Logik',
    value: 'logic'
  },
  {
    text: 'Actions',
    value: 'actions'
  }
]

export default {
  name: 'QuestionnaireComputations',
  components: { QuestionnaireComputation },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editedId: null,
      headers: HEADERS,
      newId: ''
    }
  },
  methods: {
    itemById(id) {
      return this.value.find((item) => item.id === id)
    },
    createNew() {
      console.error('NOT IMPLEMENTED')
    },
    deleteItem() {
      console.error('NOT IMPLEMENTED')
    },
    editItem(item) {
      this.editedId = item.id
      this.dialog = true
    },
    cancelEdit() {
      this.dialog = false
    },
    saveEdit() {}
  }
}
</script>
