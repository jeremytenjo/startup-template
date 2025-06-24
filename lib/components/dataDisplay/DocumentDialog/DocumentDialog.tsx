import React from 'react'
import Box from '@useweb/ui/Box'
import Dialog from '@useweb/ui/Dialog'
import Button from '@useweb/ui/Button'
import ActionBox from '@useweb/ui/ActionBox'

export type DocumentDialogProps = {
  triggerComponent: React.ReactNode
  title: string
  dialogContent: React.ReactNode
  loading: boolean
  onAgree?: () => void
}

export default function DocumentDialog(props: DocumentDialogProps) {
  const [openDialog, setOpenDialog] = React.useState(false)

  return (
    <>
      <Box
        data-id='Trigger'
        sx={{}}
        component='span'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpenDialog(true)
        }}
      >
        {props.triggerComponent}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => {return setOpenDialog(false)}}
        sx={{
          p: 0,
          border: 'none',
        }}
        wrapperSx={{
          p: 0,
          border: 'none',
        }}
      >
        <ActionBox
          headerProps={{
            title: props.title,
          }}
          childrenSx={{
            height: '300px',
            overflow: 'auto',
          }}
          ctas={
            <>
              <Button
                name='Close'
                variant='outlined'
                onClick={() => {
                  setOpenDialog(false)
                }}
                sx={{}}
              >
                Close
              </Button>
              {props.onAgree && (
                <Button
                  name='Agree'
                  disabled={props.loading}
                  sx={{}}
                  onClick={() => {
                    setOpenDialog(false)
                    props?.onAgree && props.onAgree()
                  }}
                >
                  Agree
                </Button>
              )}
            </>
          }
          sx={{}}
        >
          {props.dialogContent}
        </ActionBox>
      </Dialog>
    </>
  )
}
