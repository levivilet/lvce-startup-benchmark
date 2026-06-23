import { parseArgs } from './cli.ts'
import { hasVersionThatFailedAllIterations, runBenchmark } from './benchmark.ts'

const main = async (): Promise<void> => {
  const options = parseArgs(process.argv.slice(2))
  const result = await runBenchmark(options)
  if (hasVersionThatFailedAllIterations(result)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
