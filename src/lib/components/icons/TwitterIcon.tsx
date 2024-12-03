import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function TwitterIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='TwitterIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='13'
      fill='none'
      viewBox='0 0 15 13'
    >
      <path
        fill='#515C6D'
        d='M.334 11.197a7.776 7.776 0 0 0 4.339 1.328c5.262 0 8.228-4.623 8.049-8.772a5.866 5.866 0 0 0 1.414-1.529 5.47 5.47 0 0 1-1.628.467 2.946 2.946 0 0 0 1.249-1.63 5.607 5.607 0 0 1-1.8.718 2.782 2.782 0 0 0-2.07-.933c-1.828 0-3.173 1.773-2.759 3.618-2.352-.122-4.442-1.3-5.835-3.08-.745 1.328-.387 3.058.876 3.934a2.787 2.787 0 0 1-1.283-.366c-.028 1.364.91 2.641 2.27 2.929a2.74 2.74 0 0 1-1.277.05c.359 1.17 1.407 2.024 2.649 2.046a5.568 5.568 0 0 1-4.194 1.22Z'
      />
    </SvgIcon>
  )
}
