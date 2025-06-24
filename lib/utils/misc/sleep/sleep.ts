export type SleepProps = { ms: number }

export default function sleep(props: SleepProps) {
  return new Promise((resolve) => setTimeout(resolve, props.ms))
}
