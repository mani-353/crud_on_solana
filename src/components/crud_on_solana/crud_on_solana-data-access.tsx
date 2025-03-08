'use client'

import { getCrudOnSolanaProgram, getCrudOnSolanaProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
interface Createentryargs{
  title: string;
  body: string;
  owner: PublicKey;
}
export function useCrudOnSolanaProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCrudOnSolanaProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCrudOnSolanaProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['crud_on_solana', 'all', { cluster }],
    queryFn: () => program.account.journalist.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createEntry = useMutation<string, Error, Createentryargs>({
    mutationKey: ["journalEntry", "create", { cluster }],
    mutationFn: async ({ title,body, owner }) => {
      const [journalEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(title), owner.toBuffer()],
        programId
      );

      return program.methods.create(title, body).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry,
  }
}

export function useCrudOnSolanaProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const programId = useMemo(() => getCrudOnSolanaProgramId(cluster.network as Cluster), [cluster])
  const { program, accounts } = useCrudOnSolanaProgram()

  const accountQuery = useQuery({
    queryKey: ['crud_on_solana', 'fetch', { cluster, account }],
    queryFn: () => program.account.journalist.fetch(account),
  })
  const upgradeEntry = useMutation<string, Error, Createentryargs>({
    mutationKey: ["journalEntry", "create", { cluster }],
    mutationFn: async ({ title, body, owner }) => {
      const [journalEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(title), owner.toBuffer()],
        programId
      );

      return program.methods.update(title, body).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });
  const deleteEntry = useMutation({
    mutationKey: ["journal", "deleteEntry", { cluster, account }],
    mutationFn: (title: string) =>
      program.methods.delete(title).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });
  
  return {
    accountQuery,
    upgradeEntry,
    deleteEntry,
  }
}
