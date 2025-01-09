import React from 'react'
import Box from '@useweb/ui/Box'
import IconButton from '@useweb/ui/IconButton'
import { useRouter } from 'next/router'
import List from '@useweb/ui/List'
import Avatar from '@useweb/ui/Avatar'
import Link from '@useweb/ui/Link'
import Skeleton from '@useweb/ui/Skeleton'
import Text from '@useweb/ui/Text'

import useConversationData from '../../useConversationData/useConversationData.js'
import type UserSchema from '../../../../../../../users/user.schema.js'
import CaretIcon from '../../../../../../../../lib/components/icons/CaretIcon.js'
import LastSeenLabel from '../../../../../../../../lib/components/data/LastSeenLabel/LastSeenLabel.js'
import { rootLayoutConfig } from '../../../../../../../../lib/layouts/RootLayout/rootLayout.config.js'
import { navLinks } from '../../../../../../../navLinks/utils/useNavLinks/useNavLinks.js'

export default function ConversationHeader() {
  const router = useRouter()
  const conversation = useConversationData()
  const hasError = Boolean(
    conversation.otherUsers.get.error || !conversation.conversationId,
  )

  return (
    <Box
      data-id='ConversationHeader'
      className='blurBackground'
      sx={{
        zIndex: 2,
        display: 'flex',
        position: ['absolute', , 'static'],
        top: 0,
        width: '100%',
        height: [rootLayoutConfig.mobileHeaderHeight, , '40px'],
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'neutral.500',
        px: ['8px', , '15px'],
        pl: ['0', , '0'],
        borderRadius: [, , '0 6px 0 0'],
        left: [, , '1px'],
        borderBottom: [, , '1px solid'],
        borderBottomColor: [, , 'neutral.300'],
        right: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        <IconButton
          name='conv options'
          onClick={() => router.push('/messages')}
          sx={{
            display: ['block', , 'none'],
          }}
        >
          <CaretIcon fontSize='small' />
        </IconButton>

        <>
          {hasError ? null : (
            <>
              <Skeleton
                loading={conversation.otherUsers.get.fetching}
                circle
                sx={{
                  width: '30px',
                  height: '30px',
                  mr: '5px',
                }}
                wrapperSx={{
                  transform: 'translateY(-3px)',
                  display: [, , 'none'],
                }}
              >
                <Box
                  sx={{
                    mr: 1,
                  }}
                >
                  {conversation.otherUsers.get.data.map((user) => {
                    return (
                      <Link
                        key={user.id}
                        href={navLinks.user.url({
                          displayName: user.displayName,
                        })}
                        sx={{
                          display: [, , 'none'],
                        }}
                      >
                        <Avatar
                          alt={user.displayName}
                          src={user.profilePhoto.src}
                          sx={{
                            width: '30px',
                            height: '30px',
                          }}
                        />
                      </Link>
                    )
                  })}
                </Box>
              </Skeleton>
              <Skeleton
                loading={conversation.otherUsers.get.fetching}
                sx={{
                  width: '100px',
                  pl: [, , '15px'],
                }}
              >
                <List<UserSchema>
                  data={conversation.otherUsers.get.data || []}
                  ListItemComponent={({ itemData }) => {
                    return (
                      <Link
                        key={itemData.id}
                        href={navLinks.user.url({
                          displayName: itemData.displayName,
                        })}
                        sx={{
                          display: 'grid',
                          alignContent: 'space-between',
                          pointerEvents: [, , 'none'],
                        }}
                      >
                        <Text
                          text={itemData?.displayName}
                          sx={{
                            fontWeight: '600',
                            fontSize: '12px',
                            color: 'neutral.100',
                            display: ['flex', , 'none'],
                          }}
                        />
                        <LastSeenLabel
                          loading={conversation.otherUsers.get.fetching}
                          date={conversation?.otherUsers?.get?.firstItem?.lastSignedIn}
                          skeletonSx={{
                            pl: [, , '8px'],
                          }}
                        />
                      </Link>
                    )
                  }}
                  sx={{
                    gridAutoFlow: 'column',
                    gap: 2,
                    '& li': {
                      overflow: 'hidden',
                    },
                  }}
                />
              </Skeleton>
            </>
          )}
        </>
      </Box>

      {!!conversation.otherUsers.get?.firstItem && (
        <Box data-id='OptionsArea' sx={{}}>
          CTAaaaa
        </Box>
      )}
    </Box>
  )
}
