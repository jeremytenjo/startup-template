import React from 'react'
import UsewebButton from '@useweb/ui/Button'
import UsewebText from '@useweb/ui/Text'

export type ButtonProps = any

export default function Button() {
  return (
    <Wrapper>
      <JoinAsCreatorText />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <UsewebButton
      data-id='Button'
      sx={{
        display: 'grid',
        width: '57px',
        height: '30px',
        color: 'rgba(210, 255, 228, 1)',
        backgroundColor: 'rgba(210, 255, 228, 1)',
        borderRadius: '6px',
        gridAutoFlow: 'column',
        gridGap: '10px',
        alignItems: 'center',
        alignContent: 'center',

        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '7px',
        paddingBottom: '7px',
      }}
      name='button'
    >
      {children}
    </UsewebButton>
  )
}

const JoinAsCreatorText = () => {
  return (
    <UsewebText
      text={`Reply`}
      sx={{
        color: 'rgba(0, 136, 55, 1)',
        fontWeight: 600,
        fontSize: 13,
        lineHeight: '15.732954025268555px',
        textAlign: 'center',
      }}
    />
  )
}
