type UserSchema = {
  id: string
  displayName: string
  email: string
  photoURL: string
  bannerUrl: string | false
  agreedToTOSandPrivacyPolicy: boolean
  lastSignedIn: number
}

export default UserSchema
