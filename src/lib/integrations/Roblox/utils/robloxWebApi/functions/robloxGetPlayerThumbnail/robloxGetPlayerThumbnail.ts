import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxGetPlayerThumbnailProps = {
  userIds: number[]
  size?: number
  format?: 'png' | 'jpeg'
  circular?: boolean
  cropType?: 'body' | 'bust' | 'headshot'
}

export default async function robloxGetPlayerThumbnail(
  props: RobloxGetPlayerThumbnailProps,
) {
  assert<RobloxGetPlayerThumbnailProps>({ props, requiredProps: ['userIds'] })

  if (props.userIds.length > 100) {
    throw new Error(`too many userIds provided (${props.userIds.length}); maximum 100`)
  }

  // Validate cropType
  const cropType = props.cropType?.toLowerCase() || 'body'
  if (!Object.keys(eligibleSizes).includes(cropType)) {
    throw new Error(
      `Invalid cropping type provided: ${cropType} | Use: ${Object.keys(
        eligibleSizes,
      ).join(', ')}`,
    )
  }
  const { sizes, endpoint } = eligibleSizes[cropType]

  // Validate size
  let size = props.size || sizes[sizes.length - 1]
  if (typeof size === 'number') {
    size = `${size}x${size}`
  }
  if (!sizes.includes(size)) {
    throw new Error(
      `Invalid size parameter provided: ${size} | [${cropType.toUpperCase()}] Use: ${sizes.join(
        ', ',
      )}`,
    )
  }

  // Validate format
  const format = props.format?.toLowerCase() || 'png'

  if (format?.toLowerCase() !== 'png' && format?.toLowerCase() !== 'jpeg') {
    throw new Error(`Invalid image type provided: ${props.format} | Use: png, jpeg`)
  }

  const res = await fetchRobloxWebApi<{
    data: {
      targetId: number
      state: string
      imageUrl: string
      version: string
    }[]
  }>({
    name: 'robloxGetPlayerThumbnail',
    url: `https://thumbnails.roblox.com/v1/users/${endpoint}?userIds=${props.userIds.join(
      ',',
    )}&size=${size}&format=${format}&isCircular=${!!props.circular}`,
    dontUseCookie: true,
  })

  return res
}

export type RobloxGetPlayerThumbnailReturn = ReturnType<typeof robloxGetPlayerThumbnail>

// Variables
const eligibleSizes = {
  body: {
    sizes: [
      '30x30',
      '48x48',
      '60x60',
      '75x75',
      '100x100',
      '110x110',
      '140x140',
      '150x150',
      '150x200',
      '180x180',
      '250x250',
      '352x352',
      '420x420',
      '720x720',
    ],
    endpoint: 'avatar',
  },
  bust: {
    sizes: [
      '48x48',
      '50x50',
      '60x60',
      '75x75',
      '100x100',
      '150x150',
      '180x180',
      '352x352',
      '420x420',
    ],
    endpoint: 'avatar-bust',
  },
  headshot: {
    sizes: [
      '48x48',
      '50x50',
      '60x60',
      '75x75',
      '100x100',
      '110x110',
      '150x150',
      '180x180',
      '352x352',
      '420x420',
      '720x720',
    ],
    endpoint: 'avatar-headshot',
  },
}
