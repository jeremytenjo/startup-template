import assert from '@useweb/assert'

export type CenterHorizontalElProps = { selector: string; gap?: number }

// https://stackoverflow.com/questions/57649660/center-the-focused-item-in-horizontal-scroll
export default async function centerHorizontalEl(props: CenterHorizontalElProps) {
  assert<CenterHorizontalElProps>({ props, requiredProps: ['selector'] })

  const listEl = document.querySelector(props.selector) as HTMLElement

  if (listEl) {
    const middle = listEl.children[
      Math.floor((listEl.children.length - 1) / 2)
    ] as HTMLElement

    const scrollLeft =
      middle.offsetLeft +
      middle?.offsetWidth / 2 -
      listEl?.offsetWidth / 2 +
      (props.gap || 0)

    listEl.scrollLeft = scrollLeft
  }
}

export type CenterHorizontalElReturn = ReturnType<typeof centerHorizontalEl>
