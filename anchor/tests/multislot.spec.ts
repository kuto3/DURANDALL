import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Multislot} from '../target/types/multislot'

describe('multislot', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Multislot as Program<Multislot>

  const multislotKeypair = Keypair.generate()

  it('Initialize Multislot', async () => {
    await program.methods
      .initialize()
      .accounts({
        multislot: multislotKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([multislotKeypair])
      .rpc()

    const currentCount = await program.account.multislot.fetch(multislotKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Multislot', async () => {
    await program.methods.increment().accounts({ multislot: multislotKeypair.publicKey }).rpc()

    const currentCount = await program.account.multislot.fetch(multislotKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Multislot Again', async () => {
    await program.methods.increment().accounts({ multislot: multislotKeypair.publicKey }).rpc()

    const currentCount = await program.account.multislot.fetch(multislotKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Multislot', async () => {
    await program.methods.decrement().accounts({ multislot: multislotKeypair.publicKey }).rpc()

    const currentCount = await program.account.multislot.fetch(multislotKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set multislot value', async () => {
    await program.methods.set(42).accounts({ multislot: multislotKeypair.publicKey }).rpc()

    const currentCount = await program.account.multislot.fetch(multislotKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the multislot account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        multislot: multislotKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.multislot.fetchNullable(multislotKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
