import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { CrudOnSolana } from '../target/types/crud_on_solana'

describe('crud_on_solana', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.CrudOnSolana as Program<CrudOnSolana>

  const crud_on_solanaKeypair = Keypair.generate()

  it('Initialize CrudOnSolana', async () => {
    await program.methods
      .initialize()
      .accounts({
        crud_on_solana: crud_on_solanaKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([crud_on_solanaKeypair])
      .rpc()

    const currentCount = await program.account.crud_on_solana.fetch(crud_on_solanaKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment CrudOnSolana', async () => {
    await program.methods.increment().accounts({ crud_on_solana: crud_on_solanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.crud_on_solana.fetch(crud_on_solanaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment CrudOnSolana Again', async () => {
    await program.methods.increment().accounts({ crud_on_solana: crud_on_solanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.crud_on_solana.fetch(crud_on_solanaKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement CrudOnSolana', async () => {
    await program.methods.decrement().accounts({ crud_on_solana: crud_on_solanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.crud_on_solana.fetch(crud_on_solanaKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set crud_on_solana value', async () => {
    await program.methods.set(42).accounts({ crud_on_solana: crud_on_solanaKeypair.publicKey }).rpc()

    const currentCount = await program.account.crud_on_solana.fetch(crud_on_solanaKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the crud_on_solana account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        crud_on_solana: crud_on_solanaKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.crud_on_solana.fetchNullable(crud_on_solanaKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
