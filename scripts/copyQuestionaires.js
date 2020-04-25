const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const yaml = require('js-yaml')

const QUESTIONNAIRE_FOLDER = path.resolve(__dirname, '../questionnaires')
const QUESTIONNAIRE_DIST_FOLDER = path.resolve(
  __dirname,
  '../dist/questionnaires'
)

mkdirp.sync(QUESTIONNAIRE_DIST_FOLDER)
const questionnaires = fs.readdirSync(QUESTIONNAIRE_FOLDER)

const index = []

function cloneQuestionnaire(fileName) {
  const { name } = path.parse(fileName)
  const originalPath = path.resolve(QUESTIONNAIRE_FOLDER, fileName)
  fs.copyFileSync(
    originalPath,
    path.resolve(QUESTIONNAIRE_DIST_FOLDER, fileName)
  )
  index.push({
    file: `./${fileName}`
  })
  const yamlContent = fs.readFileSync(originalPath, 'utf8').toString()
  const jsonContent = yaml.safeLoad(yamlContent)
  const jsonFileName = `${name}.json`
  index.push({
    file: `./${jsonFileName}`
  })
  fs.writeFileSync(
    path.resolve(QUESTIONNAIRE_DIST_FOLDER, jsonFileName),
    JSON.stringify(jsonContent, undefined, 2)
  )
}

questionnaires.forEach(cloneQuestionnaire)

fs.writeFileSync(
  path.resolve(QUESTIONNAIRE_DIST_FOLDER, 'index.json'),
  JSON.stringify(index, undefined, 2)
)

console.info('cloned questionnaires to dist')
