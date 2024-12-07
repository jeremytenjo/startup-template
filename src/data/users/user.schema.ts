import type { FileInputValueSchema } from '@useweb/ui/FileInput'

import type DateSchema from '../_commonSchemas/DateSchema/date.schema.js'

type UserSchema = {
  id: string
  displayName: string
  email: string
  profilePhoto: FileInputValueSchema[0]
  bannerUrl: FileInputValueSchema[0]
  agreedToTOSandPrivacyPolicy: DateSchema
  lastSignedIn: number
}

export default UserSchema
