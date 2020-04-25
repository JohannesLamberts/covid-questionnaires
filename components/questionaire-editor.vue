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
    <v-tabs vertical>
      <v-tab>Allgemeines</v-tab>
      <v-tab>Fragen</v-tab>
      <v-tab>Berechnungen</v-tab>
      <v-tab>Ergebnisse</v-tab>
      <v-tab>Ergebnisbaum</v-tab>
      <v-tab-item>
        <v-text-field
          v-model="questionaire.meta.description"
          label="Beschreibung"
        />
      </v-tab-item>
      <v-tab-item>
        <div v-for="question of questionaire.questions" :key="question.ident">
          <h4>{{ question.id }}</h4>
          <questionaire-question :question="question" />
        </div>
      </v-tab-item>
      <v-tab-item>
        {{ questionaire.derived }}
      </v-tab-item>
      <v-tab-item>
        {{ questionaire.results }}
      </v-tab-item>
      <v-tab-item>
        {{ questionaire.resultComputation }}
      </v-tab-item>
    </v-tabs>
  </form>
</template>

<script>
import { safeDump, safeLoad } from 'js-yaml'
import { readFile, writeFile } from '~/api/git'
import QuestionaireQuestion from '~/components/questionaire-question'

export default {
  name: 'QuestionaireEditor',
  components: { QuestionaireQuestion },
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
