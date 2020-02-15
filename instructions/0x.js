const fs = require('fs')
const shell = require('shelljs')

shell.config.fatal = true
shell.config.verbose = true

const name = '0x'
const repositoryUrl = 'https://github.com/0xProject/0x-monorepo.git'
const commit = '2.1'

async function execute() {
  const originalPwd = shell.pwd()
  if (!fs.existsSync(name)) {
    shell.exec(`git clone "${repositoryUrl}" "${name}"`)
  }
  shell.cd(name)
  shell.exec(`git checkout "${commit}"`)
  shell.exec('yarn')
  // replace deployed address with first address from ganache-cli -d
  shell.exec(
    "sed -i 's/0x5409ed021d9299bf6814279a6a1411a7e866a631/0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1/' packages/dev-utils/src/constants.ts",
  )
  shell.exec('yarn build', {
    env: {
      PKG: '@0x/migrations',
    },
  })
  shell.cd('packages/migrations')
  shell.exec('yarn migrate:v2')
  shell.cd(originalPwd)

  return {}
}

module.exports = {
  execute,
  dependsOn: [],
}