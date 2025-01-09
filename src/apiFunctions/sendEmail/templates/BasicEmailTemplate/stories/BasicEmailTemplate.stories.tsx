//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import BasicEmailTemplate, {
  type BasicEmailTemplateProps,
} from '../BasicEmailTemplate.js'

const defaultArgs: BasicEmailTemplateProps = {
  title: 'Developer1 sent you a new job offer!',
  receiverName: 'Cole Tucker',
  body: 'Hi, Cole Tucker adfasdf dafsdfas dfasdfasdf asdf asdfa sdfasdf asdfa sdfasd fasdf asdfasdf',
  senderImageUrl:
    'https://firebasestorage.googleapis.com/v0/b/social-seed-main.appspot.com/o/testing%2Fusers%2Froblox.jpeg?alt=media&token=54fdeb6e-d44a-4f7f-aa22-b36b8e4d5ce8',
  ctas: [
    {
      href: '/',
      label: 'View Offer',
    },
    {
      href: '/',
      label: 'Button 2',
    },
    {
      href: '/',
      label: 'Button 3',
    },
  ],
}

export default {
  title: 'Cloud Functions/next/sendEmail/templates/BasicEmailTemplate',
  component: BasicEmailTemplate,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BasicEmailTemplateProps) => {
  React.useEffect(() => {
    document.body.style.height = '0'
  }, [])

  return <BasicEmailTemplate {...args} />
}

export const Default = {
  render: (args: BasicEmailTemplateProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BasicEmailTemplateProps
// }
