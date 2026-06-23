import assert from 'node:assert/strict'
import test from 'node:test'
import { getStats, summarizeVersion } from '../src/summary.ts'
import type { IterationResult } from '../src/types.ts'

test('getStats computes rounded summary values', () => {
  assert.deepEqual(getStats([1, 2, 3, 100]), {
    mean: 26.5,
    min: 1,
    max: 100,
    p95: 100,
  })
})

test('summarizeVersion ignores warmups and failed values for metrics', () => {
  const base = {
    version: 'latest',
    url: 'http://localhost:3000/',
    performanceMetrics: [],
  }
  const results: readonly IterationResult[] = [
    {
      ...base,
      iteration: 1,
      warmup: true,
      success: true,
      wallTimeMs: 1000,
      navigation: { startTime: 0, domInteractive: 1, domContentLoadedEventEnd: 1, loadEventEnd: 1000, responseEnd: 1, duration: 1000, transferSize: 0, encodedBodySize: 0, decodedBodySize: 0 },
      domNodeCount: 999,
      domCounters: { documents: 9, nodes: 999, jsEventListeners: 99 },
      heapUsage: { usedSize: 999, totalSize: 1999 },
    },
    {
      ...base,
      iteration: 1,
      warmup: false,
      success: true,
      wallTimeMs: 200,
      navigation: { startTime: 0, domInteractive: 1, domContentLoadedEventEnd: 1, loadEventEnd: 180, responseEnd: 1, duration: 180, transferSize: 0, encodedBodySize: 0, decodedBodySize: 0 },
      domNodeCount: 10,
      domCounters: { documents: 1, nodes: 10, jsEventListeners: 2 },
      heapUsage: { usedSize: 100, totalSize: 200 },
    },
    {
      ...base,
      iteration: 2,
      warmup: false,
      success: false,
      wallTimeMs: 0,
      navigation: null,
      domNodeCount: null,
      domCounters: null,
      heapUsage: null,
      error: 'boom',
    },
  ]
  const summary = summarizeVersion('latest', results)
  assert.equal(summary.iterations, 1)
  assert.equal(summary.failures, 1)
  assert.equal(summary.loadTimeMs.mean, 180)
  assert.equal(summary.domNodes.mean, 10)
  assert.equal(summary.heapUsed.mean, 100)
})
