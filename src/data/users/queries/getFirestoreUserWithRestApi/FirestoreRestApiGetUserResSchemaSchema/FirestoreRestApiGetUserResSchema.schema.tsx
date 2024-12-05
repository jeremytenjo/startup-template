export type FirestoreRestApiGetUserResSchemaSchema = {
  document: Document
  readTime: string
}[]

interface Document {
  name: string
  fields: Fields2
  createTime: string
  updateTime: string
}

interface Fields2 {
  reviewsAmount: ReviewsAmount
  displayName: DisplayName
  accountType: DisplayName
  robloxUserId: DisplayName
  agreedToTOSandPrivacyPolicy: ReviewsAmount
  averageRating: ReviewsAmount
  categories: Categories
  id: DisplayName
  dmSettings: DmSettings
  email: DisplayName
  twitchUsername: DisplayName
  bio: DisplayName
  stripeConnectedAccountId: DisplayName
  twitterUsername: DisplayName
  photoURL: DisplayName
  instagramUsername: DisplayName
  bannerUrl: DisplayName
  emailVerified: EmailVerified
  lastSignedIn: ReviewsAmount
}

interface EmailVerified {
  booleanValue: boolean
}

interface DmSettings {
  mapValue: MapValue
}

interface MapValue {
  fields: Fields
}

interface Fields {
  allow: DisplayName
}

interface Categories {
  arrayValue: ArrayValue
}

interface ArrayValue {}

interface DisplayName {
  stringValue: string
}

interface ReviewsAmount {
  integerValue: string
}
