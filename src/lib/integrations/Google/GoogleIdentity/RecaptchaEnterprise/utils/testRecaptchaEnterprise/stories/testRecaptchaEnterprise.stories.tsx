//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import testRecaptchaEnterprise, {
  type TestRecaptchaEnterpriseProps,
  type TestRecaptchaEnterpriseReturn,
} from '../testRecaptchaEnterprise.js'

const defaultArgs: TestRecaptchaEnterpriseProps = {
  name: 'testRecaptchaEnterprise',
}

export default {
  title:
    'lib/integrations/Google/GoogleIdentity/RecaptchaEnterprise/utils/TestRecaptchaEnterprise',

  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: TestRecaptchaEnterpriseProps) => {
  const fn = async (triggerProps = {}) => {
    return await testRecaptchaEnterprise({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<TestRecaptchaEnterpriseReturn, TestRecaptchaEnterpriseProps> fn={fn} />
    </>
  )
}

export const Default = {
  render: (args: TestRecaptchaEnterpriseProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies TestRecaptchaEnterpriseProps
// }
