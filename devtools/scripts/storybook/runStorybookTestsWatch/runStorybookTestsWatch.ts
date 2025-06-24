import shell from '../../../utils/node/shell.js'

export default async function runStorybookTestsWatch() {
  shell([
    {
      command: `test-storybook -c ./devtools/storybook --watch`,
      name: 'run storybook tests',
    },
  ])
}
