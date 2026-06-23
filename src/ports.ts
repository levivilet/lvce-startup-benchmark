import { createServer } from 'node:net'

const canListen = async (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = createServer()
    server.once('error', () => {
      resolve(false)
    })
    server.once('listening', () => {
      server.close(() => {
        resolve(true)
      })
    })
    server.listen(port, 'localhost')
  })
}

export const findFreePort = async (startPort: number): Promise<number> => {
  for (let port = startPort; port < startPort + 1000; port++) {
    if (await canListen(port)) {
      return port
    }
  }
  throw new Error(`Could not find a free port starting at ${startPort}`)
}
