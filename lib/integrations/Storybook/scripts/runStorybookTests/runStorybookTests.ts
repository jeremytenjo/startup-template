import shell from '../../../../../devtools/utils/node/shell.js'

export default async function runStorybookTests() {
  shell([
    {
      command: `test-storybook -c ./lib/integrations/Storybook`,
      name: 'run storybook tests',
    },
  ])
}
