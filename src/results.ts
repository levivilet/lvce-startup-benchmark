import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { VersionResult, VersionSummary } from './types.ts'
import { toMarkdown } from './summary.ts'

export const getRawResultPath = (outputDir: string, safeVersion: string): string => {
  return join(outputDir, 'raw', `${safeVersion}.json`)
}

export const writeVersionResult = async (outputDir: string, result: VersionResult): Promise<string> => {
  const rawDir = join(outputDir, 'raw')
  await mkdir(rawDir, { recursive: true })
  const rawPath = getRawResultPath(outputDir, result.safeVersion)
  await writeFile(rawPath, `${JSON.stringify(result, null, 2)}\n`)
  return rawPath
}

export const writeSummary = async (outputDir: string, summaries: readonly VersionSummary[]): Promise<void> => {
  await mkdir(outputDir, { recursive: true })
  await writeFile(join(outputDir, 'summary.json'), `${JSON.stringify(summaries, null, 2)}\n`)
  await writeFile(join(outputDir, 'summary.md'), toMarkdown(summaries))
}
