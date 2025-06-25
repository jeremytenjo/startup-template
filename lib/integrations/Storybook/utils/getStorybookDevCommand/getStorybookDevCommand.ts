import type { DevCommandProps } from '../../../../../devtools/utils/terminal/shellDashboard.js'
import { storybookConfig } from '../../storybook.config.js'

export default async function getStorybookDevCommand(): GetStorybookDevCommandReturn {
  const devCommand: DevCommandProps = {
    label: `Storybook`,
    command: {
      root: 'npm',
      args: 'run storybook:dev',
    },
    ports: [storybookConfig.port],
    color: '#FF4785',
  }

  return { devCommand }
}

export type GetStorybookDevCommandReturn = Promise<{
  devCommand: DevCommandProps
}>
