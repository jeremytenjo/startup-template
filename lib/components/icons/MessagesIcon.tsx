import React from 'react'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function Ivon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      fill='none'
      viewBox='0 0 14 14'
    >
      <path
        fill={colors.neutral[200]}
        fillRule='evenodd'
        d='M.25 10.956V5.05c0-1.68 0-2.52.327-3.162A3 3 0 0 1 1.888.577C2.53.25 3.37.25 5.05.25h3.9c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311c.327.642.327 1.482.327 3.162v.9c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327H5.77c-.377 0-.565 0-.74.043a1.5 1.5 0 0 0-.443.188c-.153.097-.284.232-.545.503l-.697.722c-.967 1.003-1.451 1.504-1.868 1.542a1.125 1.125 0 0 1-.954-.385C.25 13.046.25 12.35.25 10.956ZM3.25 4A.75.75 0 0 1 4 3.25h6a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 4ZM4 6.25a.75.75 0 0 0 0 1.5h2.25a.75.75 0 0 0 0-1.5H4Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
