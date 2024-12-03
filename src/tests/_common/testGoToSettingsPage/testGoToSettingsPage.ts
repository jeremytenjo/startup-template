import type { Page } from '@playwright/test'

export type TestGoToSettingsPageProps = { page: Page }

export default async function testGoToSettingsPage(props: TestGoToSettingsPageProps) {
  await props.page.getByRole('button', { name: 'account' }).click()
  await props.page.locator('text=Settings').click()
}

export type TestGoToSettingsPageReturn = ReturnType<typeof testGoToSettingsPage>
