import assert from '@useweb/assert'

export type TestRecaptchaEnterpriseProps = { name: string }

const endpoint =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3Vo2hj_hRfz1DK945jLs-mv5LNnJm6zo'

export default async function testRecaptchaEnterprise(
  props: TestRecaptchaEnterpriseProps,
) {
  assert<TestRecaptchaEnterpriseProps>({ props })

  const data = {
    returnSecureToken: false,
    email: 'random@gmail.com',
    password: 'helloooo',
    clientType: 'CLIENT_TYPE_WEB',
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

export type TestRecaptchaEnterpriseReturn = ReturnType<typeof testRecaptchaEnterprise>
