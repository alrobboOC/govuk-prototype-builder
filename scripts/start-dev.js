const { spawnSync } = require('node:child_process')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
function git(args) {
  return spawnSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 20000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }
  })
}

const branch = git(['branch', '--show-current'])
const changes = git(['status', '--porcelain', '--untracked-files=no'])

if (branch.status !== 0 || changes.status !== 0) {
  console.warn('Could not check for updates. Opening the local builder.')
} else if (branch.stdout.trim() !== 'main') {
  console.warn('Automatic update skipped: switch to main to receive updates.')
} else if (changes.stdout.trim()) {
  console.warn('Automatic update skipped: commit or stash your local edits first.')
} else {
  // Never merge divergent histories or overwrite local commits.
  // Git also refuses to overwrite an untracked file.
  const update = git(['pull', '--ff-only', '--quiet', 'origin', 'main'])
  if (update.status !== 0) {
    console.warn('Could not update automatically. Opening the local builder.')
    const detail = update.error?.message || update.stderr.trim()
    if (detail) console.warn(detail)
  }
}

// Use a fresh process so an updated launcher takes effect immediately.
const browser = spawnSync(process.execPath, [path.join(__dirname, 'open-builder.js')], {
  cwd: root,
  stdio: 'inherit'
})
if (browser.error) console.error(browser.error.message)
process.exitCode = browser.status ?? 1
