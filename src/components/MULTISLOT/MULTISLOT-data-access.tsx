'use client'

import { getMULTISLOTProgram, getMULTISLOTProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useMULTISLOTProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getMULTISLOTProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getMULTISLOTProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['MULTISLOT', 'all', { cluster }],
    queryFn: () => program.account.MULTISLOT.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['MULTISLOT', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ MULTISLOT: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useMULTISLOTProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useMULTISLOTProgram()

  const accountQuery = useQuery({
    queryKey: ['MULTISLOT', 'fetch', { cluster, account }],
    queryFn: () => program.account.MULTISLOT.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['MULTISLOT', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ MULTISLOT: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['MULTISLOT', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ MULTISLOT: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['MULTISLOT', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ MULTISLOT: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['MULTISLOT', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ MULTISLOT: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
