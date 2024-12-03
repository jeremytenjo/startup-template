// import useLocalStorage from '@useweb/use-local-storage'

export default function useShowPayPal() {
  // const showPaypalLS = useLocalStorage({
  //   key: 'showPaypal',
  // })

  // const showPaypalRes = showPaypalLS.data

  const showPaypal = false

  return { showPaypal }
}

export type UseShowPayPalReturn = ReturnType<typeof useShowPayPal>
