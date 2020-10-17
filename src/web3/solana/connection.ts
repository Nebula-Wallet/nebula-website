import { Connection } from '@solana/web3.js'

enum SolanaNetworks {
  DEV = 'http://devnet.solana.com'
}

let _connection: Connection

const getSolanaConnection = async (url: SolanaNetworks): Promise<Connection> => {
  if (_connection) {
    return _connection
  }

  _connection = new Connection(url)
  return _connection
}

export { getSolanaConnection, SolanaNetworks }
