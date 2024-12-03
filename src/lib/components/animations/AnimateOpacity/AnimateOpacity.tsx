import { animate } from 'motion'
import React, { useEffect, useRef } from 'react'

export type AnimateOpacityProps = { children?: any; sx?: any }

export default function AnimateOpacity(props: AnimateOpacityProps) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    wrapperRef.current &&
      animate(
        wrapperRef.current,
        { opacity: 1 },
        {
          duration: 0.3,
        },
      )
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: '0',
        ...(props.sx || {}),
      }}
    >
      {props.children}
    </div>
  )
}
