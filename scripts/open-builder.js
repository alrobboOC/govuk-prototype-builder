const { spawn, execFileSync } = require('node:child_process')
const path = require('node:path')
const { pathToFileURL } = require('node:url')

const builderUrl = pathToFileURL(path.resolve(__dirname, '..', 'index.html')).href
function macBrowserCommand() {
  // Resolve the default web browser rather than the app associated with HTML files.
  const plist = execFileSync('/usr/bin/defaults', ['export', 'com.apple.LaunchServices/com.apple.launchservices.secure', '-'])
  const settings = JSON.parse(execFileSync('/usr/bin/plutil', ['-convert', 'json', '-o', '-', '-'], { input: plist, encoding: 'utf8' }))
  const handlers = settings.LSHandlers || []
  const browser = handlers.find(h => h.LSHandlerContentType === 'com.apple.default-app.web-browser')?.LSHandlerRoleAll
    || handlers.find(h => h.LSHandlerURLScheme === 'https')?.LSHandlerRoleAll
  if (!browser) throw new Error('Could not find the default web browser')
  if (browser.includes('firefox')) {
    const appPath = execFileSync('/usr/bin/osascript', ['-e', `POSIX path of (path to application id ${JSON.stringify(browser)})`], { encoding: 'utf8' }).trim()
    return [path.join(appPath, 'Contents', 'MacOS', 'firefox'), ['-new-tab', builderUrl]]
  }
  if (browser === 'com.apple.Safari') {
    const url = JSON.stringify(builderUrl)
    return ['osascript', ['-e', `tell application "Safari"
activate
if (count of windows) is 0 then make new document
tell front window
set current tab to (make new tab with properties {URL:${url}})
end tell
end tell`]]
  }
  return ['open', ['-b', browser, '--args', '--new-tab', builderUrl]]
}
const commands = {
  win32: ['rundll32.exe', ['url.dll,FileProtocolHandler', builderUrl]],
  linux: ['xdg-open', [builderUrl]]
}
let command
try {
  command = process.platform === 'darwin' ? macBrowserCommand() : commands[process.platform]
} catch (error) {
  console.error(`${error.message}\nOpen ${builderUrl} manually.`)
  process.exitCode = 1
}

if (!command) {
  console.error(`Open the builder in your browser: ${builderUrl}`)
  process.exitCode = 1
} else {
  const child = spawn(command[0], command[1], { stdio: 'inherit', detached: true })
  child.on('error', error => {
    console.error(`Could not open the browser: ${error.message}\nOpen ${builderUrl} manually.`)
    process.exitCode = 1
  })
  child.on('exit', code => {
    if (code !== 0) {
      console.error(`Open the builder manually: ${builderUrl}`)
      process.exitCode = code || 1
    }
  })
  // A browser started here can stay open without blocking the Prototype Kit.
  child.unref()
}
