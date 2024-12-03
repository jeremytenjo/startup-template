import colors from '../../../theme/tokens/colors.js'

export default function gradientText(props: { gradient: string }): object {
  const gradientCss = colors.gradient[props.gradient]

  return {
    background: `-webkit-${gradientCss}`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}
