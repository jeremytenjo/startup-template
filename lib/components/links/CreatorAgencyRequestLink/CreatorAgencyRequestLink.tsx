import React from 'react'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

export type CreatorAgencyRequestLinkProps = { agreementId: string }

export default function CreatorAgencyRequestLink(props: CreatorAgencyRequestLinkProps) {
  return (
    <Link data-id='CreatorAgencyRequestLink' href={`/client/${props.agreementId}`}>
      <Button name='View' sx={{}}>
        View
      </Button>
    </Link>
  )
}
