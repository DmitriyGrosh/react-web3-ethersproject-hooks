import { useState, useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

export const useBalance = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [balance, setBalance] = useState<any>()
	const { library, account } = useWeb3React();

	useEffect(() => {
		if (account) {
			library.getBalance(account).then((val: any) => {
				setBalance(val);
				setIsLoading(false);
			})
		}

	}, [account, library])

	return {balance: balance ? formatEther(balance) : null, isLoading};
};