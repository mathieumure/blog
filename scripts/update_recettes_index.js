const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dirPath = path.join(__dirname, '..', 'src', 'recettes')
const readmeFile = 'README.md'

const getTitleLine = async filename => {
    const content = await readFile(path.join(dirPath, filename))
    return content.toString()
        .split('\n')
        .find(line => line.startsWith('# '))
        .replace('# ', '')
}

const run = async () => {
    const dirFiles = await readdir(dirPath)
    const recettesFiles = dirFiles.filter(it => it !== readmeFile)
    const recettesLinks = await Promise.all(recettesFiles.map(async recetteFile => {
        const title = await getTitleLine(recetteFile)
        const urlPath = '/recettes/' + recetteFile.substr(0, recetteFile.length - 3)
        return `- [${title}](${urlPath})`
    }))
    const recettesLinksSorted = recettesLinks.sort();
    const readmeLines = ['# Recettes', '', ...recettesLinksSorted]
    const readmeContent = readmeLines.join('\n')

    await writeFile(path.join(dirPath, readmeFile), readmeContent)
}

run()