import shell from '../../../../../devtools/utils/node/shell.js'

export default async function runStorybookTestsWatch() {
  shell([
    {
      command: `test-storybook -c ./lib/integrations/Storybook --watch`,
      name: 'run storybook tests',
    },
  ])
}
