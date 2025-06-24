import type { SuperCodeGeneratorFilesSchema } from '@jeremytenjo/super-code-generator'
import changeCase from 'change-case'

export const getStoryPrefix = (p: { folderPath: string }): string => {
  if (!p.folderPath.includes('src')) {
    return ''
  }

  const storyPrefix = p.folderPath.split('src')
  const storyPrefixProp = storyPrefix.pop() || ''
  const storyPrefixString = storyPrefixProp.substring(1)

  return storyPrefixString
}

const getStoryTemplate = ({
  name,
  type = 'component',
  helpers,
  folderPath,
  importOverride = undefined,
  storiesDefaultArgs = undefined,
}: {
  name: string
  type: string
  helpers: any
  folderPath?: string
  importOverride?: string
  storiesDefaultArgs?: string
}) => {
  const isFunctionWithComponent = type === 'Function with Component'
  const titleNamePrefix = isFunctionWithComponent ? `ui/` : ''
  const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
  const isFunction = type === 'function'
  const returnName = `${helpers?.changeCase?.capitalCase(name).split(' ').join('')}Return`
  const storyPrefix = getStoryPrefix({ folderPath: folderPath || '' })
  const pascalCase = helpers?.changeCase?.pascalCase(name)
  const camelCase = helpers?.changeCase?.camelCase(name)
  const componentFunctionName = `${
    isFunction ? camelCase : pascalCase
  }${componentNameAffix}`
  const propsName = `${pascalCase}${componentNameAffix}Props`

  return `//https://storybook.js.org/docs/react/writing-docs/docs-page
  // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
${isFunction ? `import AsyncTester from '@useweb/async-tester'` : ``}

${
  importOverride ||
  `import ${componentFunctionName}, { type ${propsName} ${
    isFunction ? `, type ${returnName}` : ''
  } } from '../${componentFunctionName}.js'`
}

const defaultArgs: ${propsName} = {
 ${!storiesDefaultArgs ? `name: '${componentFunctionName}',` : storiesDefaultArgs}
}

export default {
  title: '${storyPrefix}/${titleNamePrefix}${
    isFunction ? name : changeCase.pascalCase(name)
  }', ${!isFunction ? `component: ${componentFunctionName},` : ''}
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ${propsName}) => {
  ${
    isFunction
      ? `const fn = async (triggerProps = {}) => {
        return await ${componentFunctionName}({ ...args, ...triggerProps })
      }`
      : ''
  }

  return (
    <>
      ${
        isFunction
          ? `<AsyncTester<${returnName}, ${propsName}> fn={fn} autoExec />`
          : `
          <${componentFunctionName} {...args} />`
      }
    </>
  )
}

export const Default = {
  render: (args: ${propsName}) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ${propsName}
// }
`
}

const componentStory = ({ type, prefix = '' }) => {
  return {
    path: ({ name }) => {
      return `${prefix}stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, customProps, folderPath }) => {
      return getStoryTemplate({
        name,
        type,
        helpers,
        folderPath: customProps?.folderPath || folderPath,
      })
    },
  } as SuperCodeGeneratorFilesSchema<any>[0]
}

const componentStoryFiles = [componentStory({ type: 'component' })]
const functionStoryFiles = [componentStory({ type: 'function' })]
const functionWithComponentStoryFiles = [
  componentStory({ type: 'Function with Component', prefix: 'ui/' }),
]

export default {
  componentStoryFiles,
  functionStoryFiles,
  functionWithComponentStoryFiles,
  getStoryTemplate,
  getStoryPrefix,
}
