<template>
  <v-progress-linear v-if="!questionnaire || saving" indeterminate />
  <form v-else @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col><v-text-field v-model="commitMessage" label="Message"/></v-col>
        <v-col><v-btn type="submit">Save</v-btn></v-col>
      </v-row>
      <v-divider />
    </v-container>
    <v-tabs vertical>
      <v-tab>Meta</v-tab>
      <v-tab>Questions</v-tab>
      <v-tab>Calculations</v-tab>
      <v-tab>Results</v-tab>
      <v-tab>Result Calculatation</v-tab>
      <v-tab-item>
        <v-text-field
          v-model="questionnaire.meta.description"
          label="Description"
        />
      </v-tab-item>
      <v-tab-item>
        <div v-for="question of questionnaire.questions" :key="question.ident">
          <h4>{{ question.id }}</h4>
          <questionnaire-question :question="question" />
        </div>
      </v-tab-item>
      <v-tab-item>
        {{ questionnaire.derived }}
      </v-tab-item>
      <v-tab-item>
        {{ questionnaire.results }}
      </v-tab-item>
      <v-tab-item>
        {{ questionnaire.resultComputation }}
      </v-tab-item>
    </v-tabs>
  </form>
</template>

<script>
import { safeDump, safeLoad } from 'js-yaml'
import { readFile, writeFile } from '~/api/git'
import QuestionnaireQuestion from '~/components/questionnaire/question'

export default {
  name: 'QuestionnaireEditor',
  components: { QuestionnaireQuestion },
  data() {
    return {
      commitMessage: '',
      questionnaire: null,
      questionnaireSha: '',
      saving: false
    }
  },
  computed: {
    questionnaireAsYaml() {
      return safeDump(this.questionnaire)
    }
  },
  mounted() {
    this.readFile()
  },
  methods: {
    async readFile() {
      const questionnaire = await readFile(
        'questionnaires/should-i-get-tested.yaml'
      )
      this.questionnaire = safeLoad(questionnaire.content)
      this.questionnaireSha = questionnaire.sha
    },
    async submit() {
      this.saving = true
      await writeFile('questionnaires/should-i-get-tested.yaml', {
        message: this.commitMessage,
        content: this.questionnaireAsYaml,
        sha: this.questionnaireSha
      })
      await this.readFile()
      this.commitMessage = ''
      this.saving = false
    }
  }
}
</script>
