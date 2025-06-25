import shell from '../../../../../devtools/utils/node/shell.js'
import { storybookConfig } from '../../storybook.config.js'

export default async function startStorybook() {
  shell([
    {
      command: `storybook dev -p ${storybookConfig.port} -c ./lib/integrations/Storybook --no-open --quiet`,
      name: 'start storybook script',
      env: { STORYBOOK_NEXT_PORT: storybookConfig.nextjsPort },
    },
  ])
}

export type PayloadTypes = {
  storybookPath: string
}
