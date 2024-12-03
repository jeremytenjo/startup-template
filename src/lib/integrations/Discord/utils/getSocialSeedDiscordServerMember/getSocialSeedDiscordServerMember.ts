import type { APIGuildMember } from 'discord-api-types/v10'

import discordHttpApi from '../discordHttpApi/discordHttpApi.js'
import { discordConfig } from '../../discord.config.js'

export type getSocialSeedDiscordServerMemberProps = {
  discordUserId: string
}

export default async function getSocialSeedDiscordServerMember(
  props: getSocialSeedDiscordServerMemberProps,
): GetSocialSeedDiscordServerMemberReturn {
  const socialSeedDiscordMemberRes = await discordHttpApi<APIGuildMember>({
    endpoint: `guilds/${discordConfig.socialSeedServerId}/members/${props.discordUserId}`,
    options: {
      method: 'GET',
    },
  })

  if (!socialSeedDiscordMemberRes?.user?.id) {
    return undefined
  }

  const socialSeedDiscordMember: GetSocialSeedDiscordServerMemberReturnItemSchema = {
    id: socialSeedDiscordMemberRes.user.id,
    ...socialSeedDiscordMemberRes,
  }

  return { socialSeedDiscordMember }
}

export type GetSocialSeedDiscordServerMemberReturnItemSchema = APIGuildMember & {
  id: string
}

export type GetSocialSeedDiscordServerMemberReturn = Promise<
  | {
      socialSeedDiscordMember: GetSocialSeedDiscordServerMemberReturnItemSchema
    }
  | undefined
>
