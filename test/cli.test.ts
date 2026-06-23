import assert from 'node:assert/strict'
import test from 'node:test'
import { parseArgs } from '../src/cli.ts'

test('parseArgs uses defaults', () => {
  const options = parseArgs([])
  assert.deepEqual(options.versions, ['latest'])
  assert.equal(options.iterations, 5)
  assert.equal(options.warmups, 1)
  assert.equal(options.browser, 'chromium')
})

test('parseArgs parses benchmark options', () => {
  const options = parseArgs([
    '--versions',
    '0.84.7,0.84.6',
    '--iterations',
    '3',
    '--warmups',
    '0',
    '--timeout',
    '1000',
    '--port-base',
    '4000',
    '--workspace',
    '.',
    '--url-path',
    'foo',
    '--output',
    'out',
    '--profile',
    '--headed',
  ])
  assert.deepEqual(options.versions, ['0.84.7', '0.84.6'])
  assert.equal(options.iterations, 3)
  assert.equal(options.warmups, 0)
  assert.equal(options.timeout, 1000)
  assert.equal(options.portBase, 4000)
  assert.equal(options.urlPath, '/foo')
  assert.equal(options.output, 'out')
  assert.equal(options.profile, true)
  assert.equal(options.headed, true)
})

test('parseArgs rejects unsupported browser', () => {
  assert.throws(() => parseArgs(['--browser', 'firefox']), /Unsupported browser/)
})
