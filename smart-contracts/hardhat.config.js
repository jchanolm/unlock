// hardhat.config.js
const {
  networks,
  etherscan,
  parseForkUrl,
} = require('@unlock-protocol/hardhat-helpers')

require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-truffle5')

// full stack trace if needed
require('hardhat-tracer')

// erc1820 deployment
require('hardhat-erc1820')

// for upgrades
require('@openzeppelin/hardhat-upgrades')

// debug storage
require('hardhat-storage-layout')

// gas reporting for tests
require('hardhat-gas-reporter')

// test coverage
require('solidity-coverage')

// eslint-disable-next-line global-require
require('@nomiclabs/hardhat-etherscan')

// check contract size
require('hardhat-contract-sizer')

// our own hardhat plugin (for mainnet tests)
require('@unlock-protocol/hardhat-plugin')

const settings = {
  optimizer: {
    enabled: true,
    runs: 80,
  },
  outputSelection: {
    '*': {
      '*': ['storageLayout'],
    },
  },
}

// mainnet fork
if (process.env.RUN_FORK) {
  parseForkUrl(networks)
}

// tasks
require('./tasks/accounts')
require('./tasks/upgrade')
require('./tasks/release')
require('./tasks/utils')
require('./tasks/keys')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks,
  etherscan,
  gasReporter: {
    currency: 'USD',
    excludeContracts: ['TestNoop'],
    gasPrice: 5,
  },
  solidity: {
    compilers: [
      { version: '0.7.6', settings }, // required for uniswap
      { version: '0.8.4', settings }, // required for test/Lock/upgrades/V10
      { version: '0.8.7', settings }, // required for test/Lock/upgrades/V11
      { version: '0.8.13', settings }, // required for test/Lock/upgrades/V12
      {
        version: '0.8.21',
        settings: {
          ...settings,
          evmVersion: 'shanghai',
        },
      },
    ],
  },
  mocha: {
    timeout: 2000000,
  },
  contractSizer: {
    alphaSort: true,
    only: [':PublicLock', 'Mixin'],
  },
}
