import { Connection } from '@solana/web3.js'

enum SolanaNetworks {
  DEV = 'http://devnet.solana.com'
}

let _connection: Connection | null = null
let _network: SolanaNetworks

const getSolanaConnection = async (url: SolanaNetworks): Promise<Connection> => {
  if (_connection && _network === url) {
    return _connection
  }
  _connection = new Connection(url)
  _network = url
  return _connection
}
const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export { getSolanaConnection, SolanaNetworks, getCurrentSolanaConnection }
