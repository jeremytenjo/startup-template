import assert from '@useweb/assert'
import type { APIChannel } from 'discord-api-types/v10'

import type CtaSchema from '../../../../../data/_commonSchemas/CtaSchema/Cta.schema.js'
import discordHttpApi from '../discordHttpApi/discordHttpApi.js'
import { discordConfig } from '../../discord.config.js'
import getSocialSeedDiscordServerMember from '../getSocialSeedDiscordServerMember/getSocialSeedDiscordServerMember.js'
import appConfig from '../../../../../../app.config.js'

export type SendDiscordNotificationProps = {
  discordUseId: string
  title: string | undefined
  body: string | undefined
  ctas?: CtaSchema[]
}

export default async function sendDiscordNotification(
  props: SendDiscordNotificationProps,
) {
  assert<SendDiscordNotificationProps>({
    props,
    requiredProps: ['discordUseId', 'body'],
  })

  const userFromServer = await getSocialSeedDiscordServerMember({
    discordUserId: props.discordUseId,
  })

  if (!userFromServer?.socialSeedDiscordMember?.id) {
    throw new Error(`User not found in Startup Template Discord server`, { cause: {} })
  }

  const thread = await discordHttpApi<APIChannel>({
    endpoint: `/channels/${discordConfig.notificationsChannel?.id}/threads`,
    options: {
      method: 'POST',
      body: {
        name: props.title,
        // https://discord.com/developers/docs/resources/channel#start-thread-from-message
        auto_archive_duration: 4320,
        type: 12,
      },
    },
  })

  // Send a message to the private Discord thread
  await discordHttpApi({
    endpoint: `/channels/${thread.id}/messages`,
    options: {
      method: 'POST',
      body: {
        content: `Hello <@${userFromServer.socialSeedDiscordMember.id}>, ${
          props.title || ''
        } \n\n ${props.body || ''}`,
        // https://discord.com/developers/docs/interactions/message-components#component-object
        components: !Boolean(props.ctas?.length)
          ? undefined
          : [
              {
                type: 1,
                components:
                  props.ctas?.map((cta) => {
                    return {
                      type: 2,
                      style: 5,
                      label: cta.label,
                      url: !cta.href.includes('http')
                        ? `${appConfig.siteInfo?.domain}${cta.href}`
                        : cta.href,
                    }
                  }) || [],
              },
            ],
      },
    },
  })

  return {
    sentMessage: props,
  }
}

export type SendDiscordNotificationReturn = ReturnType<typeof sendDiscordNotification>
