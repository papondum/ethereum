import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'

const STAKING_CONTRACT = '0xb4f036c564324fDe2e6a6B61e5eB913b66eFB50f'

export function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  console.log(useEthers());
  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}

      {stakingBalance && <p>ETH2 staking balance: {formatEther(stakingBalance)} ETH </p>}
      {account && <p>Account: {account}</p>}
      {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
    </div>
  )
}
