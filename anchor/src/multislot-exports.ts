// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import MultislotIDL from '../target/idl/multislot.json'
import type { Multislot } from '../target/types/multislot'

// Re-export the generated IDL and type
export { Multislot, MultislotIDL }

// The programId is imported from the program IDL.
export const MULTISLOT_PROGRAM_ID = new PublicKey(MultislotIDL.address)

// This is a helper function to get the Multislot Anchor program.
export function getMultislotProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...MultislotIDL, address: address ? address.toBase58() : MultislotIDL.address } as Multislot, provider)
}

// This is a helper function to get the program ID for the Multislot program depending on the cluster.
export function getMultislotProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Multislot program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return MULTISLOT_PROGRAM_ID
  }
}
