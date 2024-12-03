//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'

import type { AlgoliaUserSearchProps } from '../AlgoliaAutocomplete.js'
import AlgoliaAutocomplete, {
  type AlgoliaAutocompleteProps,
} from '../AlgoliaAutocomplete.js'

const defaultArgs: AlgoliaAutocompleteProps<AlgoliaUserSearchProps> = {
  indexName: 'user_search',
  placeholder: 'Search for a user',
  hitComponent({ hit }) {
    return <div>{hit.displayName}</div>
  },
  getOptionLabel({ option }) {
    return option.displayName
  },
}

export default {
  title: 'lib/integrations/Algolia/ui/_common/AlgoliaAutocomplete',
  component: AlgoliaAutocomplete,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: any) => {
  return (
    <>
      <Form<any>
        onSubmit={({ formValues }) => {
          console.log(formValues)
        }}
      >
        <TextField<any> name='name' label='' placeholder='' />
      </Form>
      <AlgoliaAutocomplete {...args} />
    </>
  )
}

export const Default = {
  render: (args: any) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies any
// }
