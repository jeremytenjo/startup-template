// https://github.com/stdarg/tcp-port-used
import tcpPortUsed from 'tcp-port-used'

export default async function onPortsRunning({
  ports,
  onRunning,
}: {
  ports: number[]
  onRunning?: () => any
}) {
  const commandsRunning: number[] = []

  try {
    await Promise.all(
      ports.map(async (port) => {
        await tcpPortUsed.waitUntilUsed(port, 500, 200000)
        commandsRunning.push(port)

        if (commandsRunning.length === ports.length) {
          onRunning && onRunning()
        }
      }),
    )
  } catch (error: any) {
    // do nothing, there is a false positive timeout error
  }
}
