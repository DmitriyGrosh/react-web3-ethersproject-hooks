import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const AutoConnect = () => {
	const { active, activate } = useWeb3React();

	const connectToWallet = async () => {
		await activate(new InjectedConnector({}));
	};

	useEffect(() => {
		if (!active) {
			connectToWallet();
		}
	}, []);

	return null;
};

export default AutoConnect;
