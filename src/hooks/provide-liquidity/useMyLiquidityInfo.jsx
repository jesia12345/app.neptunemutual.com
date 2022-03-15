import { useState, useEffect } from "react";
import { registry } from "@neptunemutual/sdk";
import { useWeb3React } from "@web3-react/core";

import { getProviderOrSigner } from "@/lib/connect-wallet/utils/web3";
import { useAppContext } from "@/src/context/AppWrapper";
import { useInvokeMethod } from "@/src/hooks/useInvokeMethod";
import { useErrorNotifier } from "@/src/hooks/useErrorNotifier";
import { getRemainingMinStakeToAddLiquidity } from "@/src/helpers/store/getRemainingMinStakeToAddLiquidity";

const defaultInfo = {
  totalPods: "0",
  balance: "0",
  extendedBalance: "0",
  totalReassurance: "0",
  myPodBalance: "0",
  myDeposits: "0",
  myWithdrawals: "0",
  myShare: "0",
  withdrawalOpen: "0",
  withdrawalClose: "0",
};
export const useMyLiquidityInfo = ({ coverKey }) => {
  const [info, setInfo] = useState(defaultInfo);
  const [minNpmStake, setMinNpmStake] = useState("0");
  const [myStake, setMyStake] = useState("0");

  const { library, account } = useWeb3React();
  const { networkId } = useAppContext();
  const { invoke } = useInvokeMethod();
  const { notifyError } = useErrorNotifier();

  useEffect(() => {
    let ignore = false;

    if (!networkId || !account || !coverKey) {
      return;
    }

    const signerOrProvider = getProviderOrSigner(library, account, networkId);

    async function fetchInfo() {
      try {
        const instance = await registry.Vault.getInstance(
          networkId,
          coverKey,
          signerOrProvider
        );

        const args = [account];
        const [
          totalPods,
          balance,
          extendedBalance,
          totalReassurance,
          myPodBalance,
          myDeposits,
          myWithdrawals,
          myShare,
          withdrawalOpen,
          withdrawalClose,
        ] = await invoke(instance, "getInfo", {}, notifyError, args, false);

        if (ignore) return;

        setInfo({
          totalPods: totalPods.toString(),
          balance: balance.toString(),
          extendedBalance: extendedBalance.toString(),
          totalReassurance: totalReassurance.toString(),
          myPodBalance: myPodBalance.toString(),
          myDeposits: myDeposits.toString(),
          myWithdrawals: myWithdrawals.toString(),
          myShare: myShare.toString(),
          withdrawalOpen: withdrawalOpen.toString(),
          withdrawalClose: withdrawalClose.toString(),
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchInfo();
    return () => {
      ignore = true;
    };
  }, [account, coverKey, invoke, library, networkId, notifyError]);

  useEffect(() => {
    let ignore = false;
    if (!networkId || !account || !coverKey) return;

    async function fetchMinStake() {
      const signerOrProvider = getProviderOrSigner(library, account, networkId);

      const { remaining: _minNpmStake, myStake: _myStake } =
        await getRemainingMinStakeToAddLiquidity(
          networkId,
          coverKey,
          account,
          signerOrProvider.provider
        );

      if (ignore) return;
      setMinNpmStake(_minNpmStake);
      setMyStake(_myStake);
    }

    fetchMinStake();

    return () => {
      ignore = true;
    };
  }, [account, coverKey, library, networkId]);

  return {
    info,
    minNpmStake,
    myStake,
  };
};
