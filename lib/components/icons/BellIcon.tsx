import React from 'react'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function Icon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='16'
      fill='none'
      viewBox='0 0 12 16'
    >
      <path
        fill={colors.neutral[200]}
        d='M4.547 14.371c-.051-.2.122-.371.329-.371h2.25c.207 0 .38.17.329.371a1.5 1.5 0 0 1-2.908 0ZM6.754 2H5.247l-.774.278a4.494 4.494 0 0 0-2.972 4.229v.995A1.75 1.75 0 0 1 .802 8.9c-1.535 1.155-.719 3.6 1.202 3.6h7.993c1.921 0 2.738-2.445 1.202-3.6a1.75 1.75 0 0 1-.698-1.398v-.995a4.494 4.494 0 0 0-2.973-4.229L6.754 2ZM5.25 1.25a.75.75 0 0 1 1.5 0V2h-1.5v-.75Z'
      />
    </svg>
  )
}
