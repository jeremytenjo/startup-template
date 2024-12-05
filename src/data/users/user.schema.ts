import type DateSchema from '../_commonSchemas/DateSchema/date.schema.js'

type UserSchema = {
  id: string
  displayName: string
  email: string
  photoURL: string
  bannerUrl: string | false
  agreedToTOSandPrivacyPolicy: DateSchema
  lastSignedIn: number
}

export default UserSchema
