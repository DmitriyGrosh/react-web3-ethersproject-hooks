import React from "react";
import { useWeb3React } from "@web3-react/core";

import { useBalance } from "../../hooks/useBalance";
import { useBlockNumber } from "../../hooks/useBlockNumber";

import './Header.css';

const Header = () => {
	const { account, chainId, library } = useWeb3React();
	const blockNumber = useBlockNumber();
	const { balance, isLoading } = useBalance();
	const nameOfNetwork = chainId === 4 ? 'Rinkeby' : "Otheer";

	const handleSignIn = async () => {
		const message = `you are sign in at ${new Date().toString()}`
		const signature = await library.getSigner(account).signMessage(message).catch((error: any) => console.log('==========>error', error));
		console.log('==========>signature', { account, signature, message })
	};

	return (
		<div className="header">
			<div className="account">{account?.substr(0, 8)}...{account?.substr(-8, 8)}</div>
			<div className="money">
				<p>network is {nameOfNetwork}</p>
				{isLoading ? <p>Loading...</p> : <p>your balance is {balance} ETH</p>}
				<p>block are {blockNumber}</p>
			</div>
			<div className="login">
				<button onClick={handleSignIn}>Sign in</button>
			</div>
		</div>
	);
};

export default Header;
