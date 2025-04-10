'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCrudOnSolanaProgram } from './crud_on_solana-data-access'
import { CrudOnSolanaCreate, CrudOnSolanaList } from './crud_on_solana-ui'

export default function CrudOnSolanaFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCrudOnSolanaProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="CrudOnSolana"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <CrudOnSolanaCreate />
      </AppHero>
      <CrudOnSolanaList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
