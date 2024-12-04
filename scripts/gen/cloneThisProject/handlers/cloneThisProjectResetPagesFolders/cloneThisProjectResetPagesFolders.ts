import path from 'path'

import * as changeCase from 'change-case'
import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'
import copyFile from '../../../../../devtools/utils/node/copyFile/copyFile.js'
import getPageTemplate from '../../../../../devtools/codeGenerator/superCodeGen/templates/page.js'
import getPageContentTemplate from '../../../../../devtools/codeGenerator/superCodeGen/templates/pageContent.js'

import foundationPageHome from './handlers/home/foundationPageHome.js'
import foundationPageFaq from './handlers/faq/foundationPageFaq.js'
import foundationPagePrivacyPolicy from './handlers/privacy-policy/foundationPagePrivacyPolicy.js'
import foundationPageAccountResetPassword from './handlers/account/reset-password/foundationPageAccountResetPassword.js'
import foundationPageAccountSignIn from './handlers/access/sign-in/foundationPageAccountSignIn.js'
import foundationPageAccountSignUp from './handlers/access/sign-up/foundationPageAccountSignUp.js'
import foundationPageSettingsAccount from './handlers/settings/account/foundationPageSettingsAccount.js'
import foundationPageSettingsBilling from './handlers/settings/billing/foundationPageSettingsBilling.js'
import foundationPageSettingsEditProfile from './handlers/settings/profile/foundationPageSettingsEditProfile.js'
import foundationPageSettingsSecurity from './handlers/settings/security/foundationPageSettingsSecurity.js'

export type CloneThisProjectResetPagesFoldersProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export type FoundationPageReturn = {
  name: string
}

export default async function cloneThisProjectResetPagesFolders(
  props: CloneThisProjectResetPagesFoldersProps,
) {
  assert<CloneThisProjectResetPagesFoldersProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  // Handle Pages Folder
  const pagesFolder = path.join('src', 'pages')

  await removeFolder({
    folderPath: path.join(props.cloneThisProjectContext.cloneProjectPath, pagesFolder),
  })

  // copy pages
  const pagesToCopy: { name: string }[] = [
    {
      name: '_app.tsx',
    },
    {
      name: '_document.tsx',
    },
    {
      name: '404.tsx',
    },
  ]

  await Promise.all(
    pagesToCopy.map(async (page) => {
      const pageDir = path.join(process.cwd(), pagesFolder, page.name)

      const targetDir = path.join(
        props.cloneThisProjectContext.cloneProjectPath,
        pagesFolder,
        page.name,
      )

      await copyFile({ sourcePath: pageDir, targetPath: targetDir })
    }),
  )

  ////////////////////////////////////////

  // Handle Pages Content Folder
  const pagesContentFolder = path.join('src', 'pagesContent')

  await removeFolder({
    folderPath: path.join(
      props.cloneThisProjectContext.cloneProjectPath,
      pagesContentFolder,
    ),
  })

  // Add Foundation Pages
  const foundationPages: FoundationPageReturn[] = [
    foundationPageHome(),
    foundationPageAccountSignIn(),
    foundationPageAccountSignUp(),
    foundationPageAccountResetPassword(),
    foundationPageSettingsEditProfile(),
    foundationPageSettingsAccount(),
    foundationPageSettingsSecurity(),
    foundationPageSettingsBilling(),
    foundationPageFaq(),
    foundationPagePrivacyPolicy(),
  ]

  await Promise.all(
    foundationPages.map(async (page) => {
      const isIndex = page.name === 'home'
      const namePascalCase = changeCase.pascalCase(page.name.split('/').join(' '))
      const namePascalCaseWithSeparators = page.name
        .split('/')
        .map((name) => changeCase.pascalCase(name))
        .join('/')
      const pagesPageName = page.name
      const pagesContentPageName = namePascalCase

      // add pages page
      const pagesPagePath = path.join(
        props.cloneThisProjectContext.cloneProjectPath,
        pagesFolder,
        `${isIndex ? 'index' : pagesPageName}.tsx`,
      )
      const pagesPageContent = getPageTemplate.files[0].template({
        name: namePascalCaseWithSeparators,
        customProps: {
          extra: {
            imports: `import ${pagesContentPageName}Page from '@/src/pagesContent/${namePascalCaseWithSeparators}/pages/${pagesContentPageName}Page.js'`,
          },
        },
      })

      await createFile({
        filePath: pagesPagePath,
        fileContent: pagesPageContent,
        noTimestamp: true,
      })

      // add pagesContent page
      await Promise.all(
        getPageContentTemplate.files.map(async (file) => {
          const pageContentPagePath = path.join(
            props.cloneThisProjectContext.cloneProjectPath,
            pagesContentFolder,
            namePascalCaseWithSeparators,
            file.path({
              name: pagesContentPageName,
            }),
          )

          const pageContentPageContent = file.template({ name: namePascalCase })

          await createFile({
            filePath: pageContentPagePath,
            fileContent: pageContentPageContent,
            noTimestamp: true,
            nojs:
              !pageContentPagePath.includes('ts') || !pageContentPagePath.includes('tsx'),
          })
        }),
      )
    }),
  )
}

export type CloneThisProjectResetPagesFoldersReturn = ReturnType<
  typeof cloneThisProjectResetPagesFolders
>
