import { spawn } from 'child_process'

import * as React from 'react'
// https://github.com/vadimdemedes/ink
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render, Text, Box, useInput } from 'ink'
import { killPortProcess } from 'kill-port-process'

import getIpAddress from '../node/getIpAddress.js'

import onPortsRunning from './onPortsRunning.js'

console.clear()

export type Props = {
  commands: DevCommandProps[]
  onCommandsRunning?: () => any
}

export type DevCommandProps = {
  label: string
  command: {
    root: string
    args?: string
    env?: object
  }
  ports: number[]
  waitForPorts?: {
    ports: number[]
    message?: string
  }
  externalPort?: string
  color?: string
  index?: number
  enableQRCode?: boolean
  onCommandRunning?: () => any
  onOutput?: (output: string) => any
  onCommandEnd?: () => any
  onCommandError?: (props: { error: string }) => any
}

let commandsRunningTriggered = false

export default async function shellSponsorships({ commands, onCommandsRunning }: Props) {
  const allPortsInCommands = commands
    .map((command) => {
      return command.ports
    })
    .flat(1)

  try {
    await killPortProcess(allPortsInCommands)

    const triggerCommandsRunning = () => {
      if (!commandsRunningTriggered && onCommandsRunning) {
        onCommandsRunning()
        commandsRunningTriggered = true
      }
    }

    onPortsRunning({ ports: allPortsInCommands, onRunning: triggerCommandsRunning })

    // output commands
    const SubprocessOutput = () => {
      const [output, setOutput] = React.useState('')
      const onOutput = (newOutput) => {
        setOutput(newOutput)
      }

      return (
        <Box flexDirection='column'>
          {commands.map((arg, index) => {
            return <Header key={arg.label} {...arg} index={index} />
          })}

          <Box marginTop={1}>
            <Text>{output}</Text>
          </Box>

          {commands.map((arg, index) => {
            return <Command key={arg.label} {...arg} index={index} onOutput={onOutput} />
          })}
        </Box>
      )
    }

    const Header = (props: DevCommandProps & { index: number; key: any }) => {
      const [port] = props.ports
      const restardInput = (props.index + 1).toString()
      const networkUrl = `http://${getIpAddress()}:${port}`
      const externalPort = props.externalPort

      return (
        <Box flexDirection='column'>
          <Box flexDirection='row'>
            <Text color={props.color}>{props.label}: </Text>
            {externalPort ? (
              <Text dimColor>{externalPort}</Text>
            ) : port === 0 ? (
              <Text dimColor>Port not specified</Text>
            ) : (
              <>
                <Text dimColor>http://localhost:{port}</Text>
                <Text> - </Text>
                <Text dimColor>{networkUrl}</Text>
              </>
            )}
          </Box>
          <Text dimColor>Press {restardInput} to restart</Text>
        </Box>
      )
    }

    const Command = ({
      command,
      ports,
      waitForPorts,
      index = 1,
      onCommandRunning = () => {
        return null
      },
      onOutput = () => {
        return null
      },
      onCommandEnd = () => {
        return null
      },
      onCommandError = () => {
        return null
      },
    }: DevCommandProps) => {
      const shellRef = React.useRef<any>(null)
      const [output, setOutput] = React.useState('')
      const [error, setError] = React.useState<string>('')
      const restardInput = (index + 1).toString()
      const outputRef = React.useRef('')

      React.useEffect(() => {
        output && onOutput(output)
      }, [output])

      useInput((input) => {
        if (input === restardInput) {
          restartCommand()
        }
      })

      const restartCommand = () => {
        if (shellRef.current) {
          shellRef.current.kill()
          startCommand({
            label: command.root,
          })
        }
      }

      const startCommand = async (props: { label: string }) => {
        if (waitForPorts) {
          const waitForPortsMessage =
            waitForPorts.message ||
            'Waiting for ports ' + JSON.stringify(waitForPorts.message)
          setOutput(waitForPortsMessage)
          await onPortsRunning({ ports: waitForPorts.ports })
        }

        const commandArgs = command?.args?.split(' ') || ['']
        const shell = spawn(command.root, commandArgs)
        shell.stdout.on('close', () => {
          return onCommandEnd()
        })
        // https://www.npmjs.com/package/qrcode-terminal

        // https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
        shell.stdout.on('data', (data) => {
          const lines = outputRef.current + data.toString('utf8')
          const errorLogged = lines.includes('exited with code 1')
          outputRef.current = lines

          if (errorLogged) {
            shellRef.current.kill()
            setError(lines)
          } else {
            setOutput(lines)
          }
        })

        shell.stdout.on('error', (error) => {
          setError(`
            Erro: ${props.label}

            ${error.toString()}
          `)
          onCommandError &&
            onCommandError({
              error: error.toString(),
            })
        })

        shellRef.current = shell
      }

      const initialize = async () => {
        startCommand({
          label: command.root,
        })
        onPortsRunning({ ports, onRunning: onCommandRunning })
      }

      React.useEffect(() => {
        initialize()
      }, [setOutput])

      return error ? (
        <Box marginTop={1} flexDirection='column'>
          <Box marginBottom={1}>
            <Text color={'red'}>Error running `{JSON.stringify(command)}`</Text>
          </Box>
          <Text color={'red'}>{error}</Text>
        </Box>
      ) : null
    }

    render(<SubprocessOutput />)
  } catch (error: any) {
    await killPortProcess(allPortsInCommands)
    throw new Error(error)
  }
}
