import type { Config } from 'prismic-ts-codegen'

const config: Config = {
  output: './types.generated.ts',
  models: [
    './customtypes/**/index.json',
    './src/lib/integrations/Prismic/slices/**/model.json',
  ],
}

export default config
