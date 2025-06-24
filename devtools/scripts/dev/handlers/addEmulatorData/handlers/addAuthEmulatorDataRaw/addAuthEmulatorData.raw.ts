import assert from '@useweb/assert'

export type AddAuthEmulatorUsersProps<UserSchema> = { users: UserSchema[]; auth: any }

// DONT import any files other than node_modules in this file
export default async function addAuthEmulatorUsersRaw<
  UserSchema extends {
    id: string
    displayName: string
  },
>(props: AddAuthEmulatorUsersProps<UserSchema>) {
  assert<AddAuthEmulatorUsersProps<UserSchema>>({
    props,
    requiredProps: ['auth', 'users'],
  })

  const createdUserNames = props.users
    .map((c) => {
      return c.displayName
    })
    .join(', ')

  // https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
  await Promise.all(
    props.users.map(async (stubUser) => {
      await props.auth.createUser({
        ...stubUser,
        uid: stubUser.id,
        password: 'password',
      })
    }),
  )

  console.log(`Auth emulator: Created users ${createdUserNames}`)
}

export type AddAuthEmulatorUsersReturn = ReturnType<typeof addAuthEmulatorUsersRaw>
