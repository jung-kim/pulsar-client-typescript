import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export default yargs(hideBin(process.argv))
  .env('PULSAR_CLIENT')
  .option('logLevel', {
    type: 'string',
    alias: 'log-level',
    demandOption: false
  })
  .option('logFormat', {
    choices: ['json', 'console'],
    alias: 'log-format',
    demandOption: false,
    default: 'console'
  })
  .parseSync()
