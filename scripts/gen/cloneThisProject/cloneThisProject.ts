import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import type { CloneThisProjectContextSchema } from './CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import cloneThisProjectAskQuestions from './handlers/cloneThisProjectAskQuestions/cloneThisProjectAskQuestions.js'
import cloneThisProjectCloneProject from './handlers/cloneThisProjectCloneProject/cloneThisProjectCloneProject.js'
import cloneThisProjectUpdatePackageJsonName from './handlers/cloneThisProjectUpdatePackageJsonName/cloneThisProjectUpdatePackageJsonName.js'
import cloneThisProjectUpdateConfigFiles from './handlers/cloneThisProjectUpdateConfigFiles/cloneThisProjectUpdateConfigFiles.js'
import cloneThisProjectResetFirebaseFunctions from './handlers/cloneThisProjectResetFirebaseFunctions/cloneThisProjectResetFirebaseFunctions.js'
import cloneThisProjectRemovePosthogEvents from './handlers/cloneThisProjectRemovePosthogEvents/cloneThisProjectRemovePosthogEvents.js'
import cloneThisProjectResetDataFolder from './handlers/cloneThisProjectResetDataFolder/cloneThisProjectResetDataFolder.js'
import cloneThisProjectResetPagesFolders from './handlers/cloneThisProjectResetPagesFolders/cloneThisProjectResetPagesFolders.js'
import cloneThisProjectMoveTempFolder from './handlers/cloneThisProjectMoveTempFolder/cloneThisProjectMoveTempFolder.js'
import cloneThisProjectOpenNewProject from './handlers/cloneThisProjectOpenNewProject/cloneThisProjectOpenNewProject.js'
import cloneThisProjectRemoveExtraFiles from './handlers/cloneThisProjectRemoveExtraFiles/cloneThisProjectRemoveExtraFiles.js'
import cloneThisProjectOverrideComponents from './handlers/cloneThisProjectOverrideComponents/cloneThisProjectOverrideComponents.js'
import cloneThisProjectResetApiFunctions from './handlers/cloneThisProjectResetApiFunctions/cloneThisProjectResetApiFunctions.js'

export default async function cloneThisProject() {
  intro(chalk.cyan('Cloning Project'))
  const s = spinner()

  try {
    let cloneThisProjectContext: CloneThisProjectContextSchema = {
      cloneProjectName: '',
      cloneProjectPath: '',
      cloneProjectOutputPath: '',
      currentProjectName: '',
      overrideOutputFolder: false,
    }

    // ask questions
    const userAnswers = await cloneThisProjectAskQuestions({ cloneThisProjectContext })

    cloneThisProjectContext = {
      ...cloneThisProjectContext,
      ...userAnswers,
    }

    const splitPath = cloneThisProjectContext.cloneProjectPath.split('/')
    const currentProjectName = splitPath[splitPath.length - 2]
    cloneThisProjectContext.currentProjectName = currentProjectName

    cloneThisProjectContext.cloneProjectOutputPath = process
      .cwd()
      .replace(currentProjectName, cloneThisProjectContext.cloneProjectName)

    s.start()

    await cloneThisProjectCloneProject({ cloneThisProjectContext })

    await cloneThisProjectRemoveExtraFiles({ cloneThisProjectContext })

    await cloneThisProjectUpdatePackageJsonName({ cloneThisProjectContext })

    await cloneThisProjectUpdateConfigFiles({ cloneThisProjectContext })

    await cloneThisProjectResetFirebaseFunctions({ cloneThisProjectContext })

    await cloneThisProjectResetApiFunctions({ cloneThisProjectContext })

    await cloneThisProjectRemovePosthogEvents({ cloneThisProjectContext })

    await cloneThisProjectResetDataFolder({ cloneThisProjectContext })

    await cloneThisProjectResetPagesFolders({ cloneThisProjectContext })

    await cloneThisProjectOverrideComponents({ cloneThisProjectContext })

    await cloneThisProjectMoveTempFolder({ cloneThisProjectContext })

    await cloneThisProjectOpenNewProject({ cloneThisProjectContext })

    s.stop()
    outro(chalk.green('Done'))
  } catch (error: any) {
    s.stop()
    outro(chalk.red(String(error)))
    {
      error.cause && outro(chalk.red(JSON.stringify(error.cause, null, 2)))
    }
  }
}
