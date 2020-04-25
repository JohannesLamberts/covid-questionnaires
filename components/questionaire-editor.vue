<template>
  <v-progress-linear v-if="!questionaire || saving" indeterminate />
  <form v-else @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col
          ><v-text-field v-model="commitMessage" label="Mitteilung"
        /></v-col>
        <v-col><v-btn type="submit">Save</v-btn></v-col>
      </v-row>
      <v-divider />
    </v-container>
    <h3>Allgemeines</h3>
    {{ questionaire.meta }}
    <v-text-field
      v-model="questionaire.meta.description"
      label="Beschreibung"
    />
    <h3>Fragen</h3>
    {{ questionaire.questions }}
    <h3>Berechnungen</h3>
    {{ questionaire.derived }}
    <h3>Ergebnisse</h3>
    {{ questionaire.results }}
    <h3>Ergebnisbaum</h3>
    {{ questionaire.resultComputation }}
  </form>
</template>

<script>
import { safeDump, safeLoad } from 'js-yaml'
import { readFile, writeFile } from '~/api/git'

export default {
  name: 'QuestionaireEditor',
  data() {
    return {
      commitMessage: '',
      questionaire: null,
      questionaireSha: '',
      saving: false
    }
  },
  computed: {
    questionaireAsYaml() {
      return safeDump(this.questionaire)
    }
  },
  mounted() {
    this.readFile()
  },
  methods: {
    async readFile() {
      const questionaire = await readFile(
        'questionaires/should-i-get-tested.yaml'
      )
      this.questionaire = safeLoad(questionaire.content)
      this.questionaireSha = questionaire.sha
    },
    async submit() {
      this.saving = true
      await writeFile('questionaires/should-i-get-tested.yaml', {
        message: this.commitMessage,
        content: this.questionaireAsYaml,
        sha: this.questionaireSha
      })
      await this.readFile()
      this.commitMessage = ''
      this.saving = false
    }
  }
}
</script>
