import React, { useEffect } from 'react'
import useSnackbar, { Snackbar, SnackbarProvider } from '@useweb/ui/Snackbar'

export default {
  title: 'lib/components/useweb/Snackbar',
  args: {},
}

const Provider = ({ children }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>
}

const Child = () => {
  const snackbar = useSnackbar()

  useEffect(() => {
    trigger()
  }, [])

  const trigger = () => {
    snackbar.show({
      message: `This is a snackbar`,
      disableAutoHide: true,
      hideOnClick: false,
    })
  }

  return (
    <div>
      <button onClick={trigger}>Show</button>
    </div>
  )
}

export const Example = {
  render: () => {
    return (
      <Provider>
        <Child />
      </Provider>
    )
  },
}

export const SnackbarOnly = {
  render: () => {
    return <Snackbar title='Title' message='This is a snackbar' />
  },
}
