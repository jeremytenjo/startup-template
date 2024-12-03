import assert from '@useweb/assert'

export type TestFIrestoreUpdateProps = any

const endpoint =
  'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC3Vo2hj_hRfz1DK945jLs-mv5LNnJm6zo'

export default async function testFIrestoreUpdate(props: TestFIrestoreUpdateProps) {
  assert<TestFIrestoreUpdateProps>({ props })

  const data = {
    returnSecureToken: false,
    email: 'random@gmail.com',
    password: 'helloooo',
    clientType: 'CLIENT_TYPE_WEB',
    idToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSmVyZW15IFRlbmpvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lSSGZPV0hRNEVFbzRSaXl0Um8tS3NSOExNOGxKWXFlamhHVU9IQnRoc1lpOEE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsLXNlZWQtbWFpbiIsImF1ZCI6InNvY2lhbC1zZWVkLW1haW4iLCJhdXRoX3RpbWUiOjE3MDUwMDQwMzMsInVzZXJfaWQiOiJuMWVSTjgzTUExY2FxVGsyemczVGVGYVZUMkYzIiwic3ViIjoibjFlUk44M01BMWNhcVRrMnpnM1RlRmFWVDJGMyIsImlhdCI6MTcwNTAxMzk0MCwiZXhwIjoxNzA1MDE3NTQwLCJlbWFpbCI6InRlbmpvamVyZW15QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA5MTI5MDU1NzI2MDk0MDk5NjczIl0sImVtYWlsIjpbInRlbmpvamVyZW15QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.XrsjmVrdPABcZ7Xs3iqQhNpZPPQYP3-fgV5rwqAA42jb-3A_7hyBQCluqYfhNrAX0fgLDxWDYru2Jpa8cWR_nzs2eKKWg9MBk9m0gZxWIfdi3H-UDiv5NJqvFBSoPzMxrCbE8RoUzJzdDVXLPduPkVD0bM1TBFoy8mMC64qOqnyK9dCqwDfCZxI65q8JyThMl1r_vxRN7x3t83W26bx8QdxdNpMnrKEGmA79hKZ7brkbup_OO9e9odhzsi_1eQrCINpTb75e6XMSKw8-BXWjoYup4fXFWp-vs-dNn5SEyPhdd4X2Y3gzmc0ftjjBct9Ham6mJXrWsXfe3woWRLIlPQ',
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      return result
    })
    .catch(console.error)

  return { res }
}

export type TestFIrestoreUpdateReturn = ReturnType<typeof testFIrestoreUpdate>
