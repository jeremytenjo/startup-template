import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

import type { GetStandardPageByUidReturn } from '../getStandardPageByUid/getStandardPageByUid.js'

export type PrismicStandardPageProviderProps = {
  getStandardPageByUidReturn: Awaited<GetStandardPageByUidReturn>
  children: ReactNode
}

type PrismicStandardPageContextType = Awaited<GetStandardPageByUidReturn> | undefined

const PrismicStandardPageContext = createContext<
  PrismicStandardPageContextType | undefined
>(undefined)

export const usePrismicStandardPage = () => {
  const context = useContext(PrismicStandardPageContext)
  if (!context) {
    throw new Error(
      'usePrismicStandardPage must be used within a PrismicStandardPageProvider',
    )
  }
  return context
}

export default function PrismicStandardPageProvider(
  props: PrismicStandardPageProviderProps,
) {
  return (
    <PrismicStandardPageContext.Provider value={props.getStandardPageByUidReturn}>
      {props.children}
    </PrismicStandardPageContext.Provider>
  )
}
