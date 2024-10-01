import path from 'node:path'
import {
	getApps,
	isProblemApp,
	setPlayground,
	getPlaygroundAppName,
	getAppByName,
} from '@epic-web/workshop-utils/apps.server'
import fsExtra from 'fs-extra'

const playgroundAppName = await getPlaygroundAppName()
const app = await getAppByName(playgroundAppName).catch(() => {})

if (!app) {
	console.error('❌  app not found')
	throw new Error('app not found')
}

const [, moduleFolder, exerciseFolder] = app.relativePath.split('/')
const playgroundFolderName = exerciseFolder.replace('problem', 'playground')

const playgroundPath = path.join(process.cwd(), 'playground')
const solutionPath = path.join(
	process.cwd(),
	'stored-playgrounds',
	moduleFolder,
	playgroundFolderName,
)

const doesPlaygroundExist = await fsExtra.exists(playgroundPath)

if (!doesPlaygroundExist) {
	console.error('❌  playground does not exist')
	throw new Error('playground does not exist')
}

if (doesPlaygroundExist) {
	// create folder for solution
	await fsExtra.ensureDir(solutionPath).catch(error => {
		console.error(error)
		throw new Error('❌  ensureDir failed')
	})
	// copy playground to solution
	await fsExtra.copy(playgroundPath, solutionPath)

	console.log('✅  playground saved on: ', solutionPath)
}
