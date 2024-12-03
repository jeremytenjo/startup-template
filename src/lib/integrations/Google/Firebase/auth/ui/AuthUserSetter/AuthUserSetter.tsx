import React, { useEffect, useState } from 'react'
import List from '@useweb/ui/List'
import Box from '@useweb/ui/Box'
import Avatar from '@useweb/ui/Avatar'
import MenuItem from '@useweb/ui/MenuItem'
import Dialog from '@useweb/ui/Dialog'
import useKeyPress from '@useweb/use-key-press'
import Button from '@useweb/ui/Button'
import IconButton from '@useweb/ui/IconButton'
import LinearProgress from '@useweb/ui/LinearProgress'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Text from '@useweb/ui/Text'

import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import type UserSchema from '../../../../../../../data/users/user.schema.js'
import userStubs from '../../../../../../../data/users/users.stubs.js'

export type AuthUserSetterProps = {
  open?: boolean
  signInAs?: string
  children?: any
  // to test in real devices in local network
  ignoreAuthUserSetter?: boolean
}

export default function AuthUserSetter(props: AuthUserSetterProps) {
  const [openDialog, setOpenDialog] = useState(props.open)
  const auth = useAuth({
    onSignIn() {
      setOpenDialog(() => false)
    },
    onSignOut() {
      setOpenDialog(() => false)
    },
  })

  const renderChildren = props.ignoreAuthUserSetter
    ? true
    : props.signInAs
    ? auth.user
    : true

  useEffect(() => {
    if (props.signInAs) {
      const email = userStubs.filter((u) => u.id === props.signInAs)?.[0]?.email
      const password = 'password'

      auth.signIn({
        emailSignIn: {
          email,
          password,
        },
      })
    }

    return () => {
      auth.signOut()
    }
  }, [props.signInAs])

  useKeyPress('u', () => setOpenDialog((s) => !s))

  return (
    <>
      {renderChildren && (props.children || null)}
      <IconButton
        name='AuthUserSetter trigger'
        onClick={() => setOpenDialog((s) => !s)}
        aria-hidden={undefined}
        sx={{
          position: 'fixed',
          bottom: '15px',
          right: '50px',
          zIndex: 1000,
        }}
      >
        <Avatar
          src={auth?.user?.photoURL}
          alt={auth?.user?.displayName}
          avatarProps={{
            title: !auth?.user
              ? 'Click to sign in'
              : `Signed in as ${auth?.user?.displayName} (${auth?.user?.id})`,
          }}
          sx={{
            width: '30px',
            height: '30px',
          }}
          imgProps={{
            unoptimized: true,
          }}
        />
      </IconButton>
      <Dialog
        open={!!openDialog}
        onClose={() => setOpenDialog(false)}
        data-id='AuthUserSetter'
        wrapperSx={{
          zIndex: 1000,
        }}
        title={
          auth.user?.displayName ? `Signed in as ${auth.user?.displayName}` : 'Sign in'
        }
      >
        <List<UserSchema>
          data={userStubs || []}
          ListItemComponent={({ itemData }) => {
            const isSignedIn = auth?.user?.id === itemData.id

            return (
              <MenuItem
                {...menuttempoprs}
                onClick={() => {
                  if (isSignedIn) return
                  auth.signIn({
                    emailSignIn: {
                      email: itemData?.email as string,
                      password: 'password',
                    },
                  })
                }}
                sx={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '100px',
                  px: '0px',
                  pr: '5px',
                  height: 'fit-content',
                  justifyContent: 'space-between',
                  transition: '0.2s',

                  '&:hover': {
                    backgroundColor: 'neutral.400',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Avatar src={itemData.photoURL} alt={itemData.displayName} />

                  {itemData && (
                    <Text
                      text={itemData.displayName}
                      sx={{
                        color: isSignedIn ? 'neutral.100' : 'neutral.200',
                        fontWeight: isSignedIn ? '600' : '400',
                      }}
                    />
                  )}
                </Box>

                {isSignedIn && (
                  <Button
                    onClick={auth.signOut}
                    name='sign out'
                    variant='text'
                    sx={{
                      color: 'neutral.100',
                    }}
                  >
                    Sign out
                  </Button>
                )}
              </MenuItem>
            )
          }}
        />

        {auth.isSigningIn && (
          <>
            <LinearProgress
              sx={{
                mt: 2,
              }}
            />
          </>
        )}

        <ErrorMessage
          error={auth.signingInError}
          message={auth.signingInError.toString()}
        />
      </Dialog>
    </>
  )
}

const menuttempoprs = {
  component: 'div',
}
