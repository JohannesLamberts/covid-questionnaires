const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const yaml = require('js-yaml')

const QUESTIONAIRE_FOLDER = path.resolve(__dirname, '../questionaires')
const QUESTIONAIRE_DIST_FOLDER = path.resolve(
  __dirname,
  '../dist/questionaires'
)

mkdirp.sync(QUESTIONAIRE_DIST_FOLDER)
const questionaires = fs.readdirSync(QUESTIONAIRE_FOLDER)

function cloneQuestionaire(fileName) {
  const { name } = path.parse(fileName)
  const originalPath = path.resolve(QUESTIONAIRE_FOLDER, fileName)
  fs.copyFileSync(
    originalPath,
    path.resolve(QUESTIONAIRE_DIST_FOLDER, fileName)
  )
  const yamlContent = fs.readFileSync(originalPath, 'utf8').toString()
  const jsonContent = yaml.safeLoad(yamlContent)
  fs.writeFileSync(
    path.resolve(QUESTIONAIRE_DIST_FOLDER, `${name}.json`),
    JSON.stringify(jsonContent, undefined, 2)
  )
}

questionaires.forEach(cloneQuestionaire)

console.info('cloned questionaires to dist')
