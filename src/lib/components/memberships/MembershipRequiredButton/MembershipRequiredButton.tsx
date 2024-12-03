import React from 'react'
import Box from '@useweb/ui/Box'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

export type MembershipRequiredButtonProps = { text: string }

export default function MembershipRequiredButton(props: MembershipRequiredButtonProps) {
  return (
    <Wrapper>
      <Link href={`/signin`}>
        <Button name='sign in' sx={{}}>
          {props.text}
        </Button>
      </Link>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='MembershipRequiredButton' sx={{}}>
      {children}
    </Box>
  )
}
