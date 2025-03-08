// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CrudOnSolanaIDL from '../target/idl/crud_on_solana.json'
import type { CrudOnSolana } from '../target/types/crud_on_solana'

// Re-export the generated IDL and type
export { CrudOnSolana, CrudOnSolanaIDL }

// The programId is imported from the program IDL.
export const CRUD_ON_SOLANA_PROGRAM_ID = new PublicKey(CrudOnSolanaIDL.address)

// This is a helper function to get the CrudOnSolana Anchor program.
export function getCrudOnSolanaProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CrudOnSolanaIDL, address: address ? address.toBase58() : CrudOnSolanaIDL.address } as CrudOnSolana, provider)
}

// This is a helper function to get the program ID for the CrudOnSolana program depending on the cluster.
export function getCrudOnSolanaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the CrudOnSolana program on devnet and testnet.
      return new PublicKey('2vP3NBeycF7fhm66QcecEE1YmsGFiGWeDZXVSxaLNJzR')
    case 'mainnet-beta':
    default:
      return CRUD_ON_SOLANA_PROGRAM_ID
  }
}
