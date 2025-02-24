import { getProviderOrSigner } from '@/lib/connect-wallet/utils/web3'
import { useNetwork } from '@/src/context/Network'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { getReplacedString } from '@/utils/string'
import { ADDRESS_ONE, UNSTAKE_INFO_URL } from '@/src/config/constants'
import { getUnstakeInfoFor } from '@/src/services/protocol/consensus/info'

const defaultInfo = {
  yes: '0',
  no: '0',
  myYes: '0',
  myNo: '0',
  totalStakeInWinningCamp: '0',
  totalStakeInLosingCamp: '0',
  myStakeInWinningCamp: '0',
  unstaken: '0',
  latestIncidentDate: '0',
  burnRate: '0',
  reporterCommission: '0',
  allocatedReward: '0',
  toBurn: '0',
  toReporter: '0',
  myReward: '0',
  willReceive: '0'
}

export const useConsensusReportingInfo = ({
  coverKey,
  productKey,
  incidentDate
}) => {
  const [info, setInfo] = useState(defaultInfo)
  const { account, library } = useWeb3React()
  const { networkId } = useNetwork()

  const fetchInfo = useCallback(async () => {
    if (!networkId || !coverKey) {
      return
    }

    let data
    if (account) {
      // Get data from provider if wallet's connected
      const signerOrProvider = getProviderOrSigner(library, account, networkId)
      data = await getUnstakeInfoFor(
        networkId,
        coverKey,
        productKey,
        account,
        incidentDate,
        signerOrProvider.provider
      )
    } else {
      // Get data from API if wallet's not connected
      const response = await fetch(
        getReplacedString(UNSTAKE_INFO_URL, {
          networkId,
          coverKey,
          productKey,
          account: ADDRESS_ONE,
          incidentDate
        }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )

      if (!response.ok) {
        return
      }

      data = (await response.json()).data
    }

    return data
  }, [networkId, coverKey, account, library, productKey, incidentDate])

  useEffect(() => {
    let ignore = false

    fetchInfo()
      .then((data) => {
        if (ignore || !data) {
          return
        }

        setInfo(data)
      })
      .catch(console.error)

    return () => {
      ignore = true
    }
  }, [fetchInfo])

  const updateFetchInfo = useCallback(() => {
    fetchInfo()
      .then((_info) => {
        if (!_info) return
        setInfo(_info)
      })
      .catch(console.error)
  }, [fetchInfo])

  return {
    info,
    refetch: updateFetchInfo
  }
}
