import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Dialog from '@useweb/ui/Dialog'
import Image from '@useweb/ui/Image'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

import useAuth from '../../utils/useAuth/useAuth.js'
import { navLinks } from '../../../navLinks/utils/useNavLinks/useNavLinks.js'
import appConfig from '../../../../../app.config.js'

export type PromptAuthDialogProps = {
  title: string
  children: any
}

export default function PromptAuthDialog(props: PromptAuthDialogProps) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const auth = useAuth()

  return (
    <>
      <Box
        data-id='PromptAuthDialogWrapper'
        onClick={() => {
          if (!auth?.user?.id) {
            setOpenDialog(true)
          }
        }}
        sx={{
          cursor: 'pointer',

          '& *': {
            ...(!auth?.user?.id && { pointerEvents: 'none !important' }),
          },
        }}
      >
        {props.children}
      </Box>

      <Dialog
        open={openDialog}
        data-id='PromptAuthDialog'
        onClose={() => setOpenDialog(false)}
        wrapperSx={{
          p: 4,
          display: 'grid',
          gap: 2,
          justifyContent: 'center',
          justifyItems: 'center',
          alignItems: 'start',
          position: 'relative',
          border: 'none',
          overflow: 'hidden',
        }}
      >
        <Image
          src={`/images/logo/logo.svg`}
          alt={`logo`}
          width={300}
          height={300}
          sx={{
            width: ['40px', '50px'],
            height: ['40px', '50px'],
            mb: [1, 2],
          }}
        />

        <Text
          text={`${navLinks.access.signIn.label} to ${props.title}`}
          tag='p'
          sx={{
            color: 'neutral.100',
            fontWeight: 600,
            fontSize: '23px !important',
            lineHeight: '32px',
            textAlign: 'center',
            justifySelf: 'center',
          }}
        />

        <Text
          text={`Access ${appConfig.siteInfo.name}`}
          tag='p'
          sx={{
            color: 'neutral.200',
            fontSize: '13px',
            textAlign: 'center',
            mt: '-10px',
            mb: 2,
          }}
        />

        <Box
          data-id='PromptAuthDialogCtas'
          sx={{
            display: 'grid',
            gap: 2,
            gridAutoFlow: 'column',
          }}
        >
          <Link href={`${navLinks.access.signUp.url}`}>
            <Button name='SignUp' variant='outlined' sx={{}}>
              {navLinks.access.signUp.label}
            </Button>
          </Link>

          <Link href={`${navLinks.access.signIn.url}`}>
            <Button name='SignIn' sx={{}}>
              {navLinks.access.signIn.label}
            </Button>
          </Link>
        </Box>
      </Dialog>
    </>
  )
}
