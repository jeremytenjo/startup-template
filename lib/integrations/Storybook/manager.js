// https://storybook.js.org/docs/react/configure/theming
import { addons } from '@storybook/manager-api'
import { themes } from '@storybook/theming'

addons.setConfig({
  theme: themes.light,
})
