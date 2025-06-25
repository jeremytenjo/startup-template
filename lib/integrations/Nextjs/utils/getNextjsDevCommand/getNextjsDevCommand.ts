import assert from '@useweb/assert'

import type { DevCommandProps } from '../../../../../devtools/utils/terminal/shellDashboard.js'
import { nextjsConfig } from '../../nextjs.config.js'

export type GetNextjsDevCommandProps = { dataSource: 'dev' | 'prod' }

export default async function getNextjsDevCommand(
  props: GetNextjsDevCommandProps,
): GetNextjsDevCommandReturn {
  assert<GetNextjsDevCommandProps>({ props, requiredProps: ['dataSource'] })

  const devCommand: DevCommandProps = {
    label: 'Nextjs',
    command: {
      root: 'node',
      args: `--experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev -p ${nextjsConfig.port}`,
      env: {
        DATA_SOURCE: props.dataSource,
      },
    },
    ports: [nextjsConfig.port],
    color: '#fff',
  }

  return {
    devCommand,
  }
}

export type GetNextjsDevCommandReturn = Promise<{
  devCommand: DevCommandProps
}>
