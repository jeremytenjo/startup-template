export type SleepProps = { ms: number }

export default function sleep(props: SleepProps) {
  return new Promise((resolve) => {
    return setTimeout(resolve, props.ms)
  })
}
