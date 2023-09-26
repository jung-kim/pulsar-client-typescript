import yargs from 'yargs/yargs'

/* i.e.
PULSAR_CLIENT_snOauth2KeyFile=/Users/user/Downloads/key-file-name.json
PULSAR_CLIENT_audience='urn:sn:pulsar:{org}:{instance}'
PULSAR_CLIENT_brokerUrl='pulsar+ssl://{broker url}:{port}'
npm run test:e2e
*/
export const configs = yargs(process.argv.slice(2))
  .env('PULSAR_CLIENT')
  .option('snOauth2KeyFile', { type: 'string', alias: 'sn-oauth2-key-file', demandOption: true, describe: 'oauth2 key file to use' })
  .option('audience', { type: 'string', alias: 'audience', demandOption: true, describe: 'audience to use to get oauth2 token with, usualy in the format of `urn:sn:pulsar:{org}:{instance}`' })
  .options('brokerUrl', { type: 'string', alias: 'brokerUrl', demandOption: true, describe: 'broker url in the format of `pulsar+ssl://{broker url}:{port}`' })
  .parseSync()
