import assert from 'node:assert/strict'
import test from 'node:test'
import { getSafeVersionName } from '../src/versionPaths.ts'

test('getSafeVersionName keeps simple versions', () => {
  assert.equal(getSafeVersionName('0.84.7'), '0.84.7')
  assert.equal(getSafeVersionName('latest'), 'latest')
})

test('getSafeVersionName replaces unsafe characters', () => {
  assert.equal(getSafeVersionName('github:user/repo#main'), 'github_user_repo_main')
})
