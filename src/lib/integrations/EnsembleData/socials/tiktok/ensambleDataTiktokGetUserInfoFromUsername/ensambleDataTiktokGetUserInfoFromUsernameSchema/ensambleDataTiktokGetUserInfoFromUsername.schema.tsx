export type ensambleDataTiktokGetUserInfoFromUsernameSchema = {
  data: Data
}

interface Data {
  user: User
  stats: Stats
}

interface User {
  create_time: number
  account_labels: any
  shield_follow_notice: number
  youtube_channel_id: string
  avatar_168x168: Avatar168x168
  friends_status: number
  has_orders: boolean
  item_list: any
  cv_level: string
  bold_fields: any
  favoriting_count: number
  followers_detail: any
  is_phone_binded: boolean
  share_qrcode_uri: string
  enable_direct_message: boolean
  verification_type: number
  shield_edit_field_info: any
  has_insights: boolean
  avatar_medium: AvatarMedium
  geofencing: any
  avatar_uri: string
  is_discipline_member: boolean
  google_account: string
  follow_status: number
  has_facebook_token: boolean
  avatar_300x300: Avatar300x300
  follower_status: number
  download_prompt_ts: number
  need_points: any
  hide_search: boolean
  youtube_expire_time: number
  authority_status: number
  apple_account: number
  short_id: string
  bind_phone: string
  cover_url: CoverUrl[]
  advanced_feature_info: any
  search_user_name: string
  user_mode: number
  avatar_thumb: AvatarThumb
  live_verify: number
  original_musician: OriginalMusician
  prevent_download: boolean
  language: string
  enterprise_verify_reason: string
  live_commerce: boolean
  comment_filter_status: number
  is_star: boolean
  cha_list: any
  name_field: string
  fb_expire_time: number
  secret: boolean
  has_email: boolean
  status: number
  events: any
  special_account: SpecialAccount
  special_lock: number
  has_twitter_token: boolean
  tw_expire_time: number
  shield_comment_notice: number
  account_region: string
  block_status: number
  advance_feature_item_order: any
  avatar_larger: AvatarLarger
  custom_verify: string
  show_image_bubble: boolean
  user_tags: any
  can_message_follow_status_list: any
  download_setting: number
  relative_users: any
  nickname: string
  room_id: number
  share_info: ShareInfo
  with_commerce_entry: boolean
  region: string
  commerce_user_level: number
  homepage_bottom_toast: any
  ins_id: string
  twitter_id: string
  is_block: boolean
  platform_sync_info: any
  youtube_channel_title: string
  twitter_name: string
  user_period: number
  react_setting: number
  user_profile_guide: any
  need_recommend: number
  has_youtube_token: boolean
  unique_id_modify_time: number
  ad_cover_url: any
  verify_info: string
  video_icon: VideoIcon
  user_rate: number
  search_user_desc: string
  is_ad_fake: boolean
  live_agreement: number
  white_cover_url: any
  user_canceled: boolean
  type_label: any
  search_highlight: any
  mutual_relation_avatars: any
  shield_digg_notice: number
  accept_private_policy: boolean
  can_set_geofencing: any
  mention_status: number
  signature: string
  id: string
  uniqueId: string
  avatarThumb: string
  avatarMedium: string
  avatarLarger: string
  verified: boolean
  secUid: string
  ftc: boolean
  relation: number
  openFavorite: boolean
  commentSetting: number
  duetSetting: number
  stitchSetting: number
  privateAccount: boolean
}

interface Avatar168x168 {
  height: number
  uri: string
  url_list: string[]
  width: number
}

interface AvatarMedium {
  uri: string
  url_list: string[]
  width: number
  height: number
}

interface Avatar300x300 {
  uri: string
  url_list: string[]
  width: number
  height: number
}

interface CoverUrl {
  uri: string
  url_list: string[]
  width: number
  height: number
}

interface AvatarThumb {
  height: number
  uri: string
  url_list: string[]
  width: number
}

interface OriginalMusician {
  music_count: number
  music_used_count: number
  digg_count: number
}

interface SpecialAccount {
  special_account_list: any
}

interface AvatarLarger {
  width: number
  height: number
  uri: string
  url_list: string[]
}

interface ShareInfo {
  share_title_other: string
  share_desc_info: string
  now_invitation_card_image_urls: any
  share_url: string
  share_desc: string
  share_title: string
  share_qrcode_url: ShareQrcodeUrl
  share_title_myself: string
}

interface ShareQrcodeUrl {
  height: number
  uri: string
  url_list: any[]
  width: number
}

interface VideoIcon {
  width: number
  height: number
  uri: string
  url_list: any[]
}

interface Stats {
  followingCount: number
  followerCount: number
  heartCount: number
  videoCount: number
  diggCount: number
  heart: number
}
