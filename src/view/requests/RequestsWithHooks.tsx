import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import abi from '../../abi.json';
import './style.css';

const RequestsWithHooks = () => {
	const { account, library } = useWeb3React();

	const [greeting, setGreeting] = useState<string>('');
	const [greeting2, setGreeting2] = useState<string>('');

	const [changeGreeting, setChangeGreeting] = useState<string>('');
	const [changeGreeting2, setChangeGreeting2] = useState<string>('');

	const [error, setError] = useState<string>('');
	const [error2, setError2] = useState<string>('');

	const contractAddress = '0xcbd3E4e7D7Bd39319F1D507d4d1F61B9EDDa6e04';

	const requestAccounts = async () => {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
	};

	// we can use library for getting public data
	const handleGetGreeting = async () => {
		const contract = new Contract(contractAddress, abi, library);
		const greet = await contract.message();
		setGreeting(greet);
	};

	// we can use library.getSigner() for getting public data
	const handleGetGreeting2 = async () => {
		const contract = new Contract(contractAddress, abi, library.getSigner(account));
		const greet = await contract.message();
		setGreeting2(greet);
	};

	//if we use only library we can't set data in smart contract
	const handleSetGreeting = async () => {
		try {
			requestAccounts();
			const contract = new Contract(contractAddress, abi, library);
			const transaction = await contract.setMessage(changeGreeting);
			transaction.wait();

			handleGetGreeting();
		} catch (e) {
			console.log('==========>Error: ', e)
			setError('Error')
		}
	};

	//if we use library.getSigner() we can set data in smart contract
	const handleSetGreeting2 = async () => {
		try {
			requestAccounts();
			const contract = new Contract(contractAddress, abi, library.getSigner(account));
			console.log('==========>changeGreeting2', changeGreeting2)
			const transaction = await contract.setMessage(changeGreeting2);
			transaction.wait();

			handleGetGreeting2();
		} catch (e) {
			console.log('==========>Error: ', e)
			setError2("Error")
		}
	};

	return (
		<div className="requests">
			<p>Requests With Hooks</p>
			<div className="container">
				<label>Use function without signer</label>
				<button onClick={handleGetGreeting}>Get Greeting</button>
				<p>Greeting is "{greeting}"</p>
			</div>
			<div className="container">
				<label>Use function with signer</label>
				<button onClick={handleGetGreeting2}>Get Greeting</button>
				<p>Greeting is "{greeting2}"</p>
			</div>

			<div className="container">
				<label>Use function without signer</label>
				<input type="text" onChange={(e) => setChangeGreeting(e.target.value)}/>
				<button onClick={handleSetGreeting}>Set Greeting</button>
				<p>Greeting is "{greeting}"</p>
				{error && <p>{error}</p>}
			</div>

			<div className="container">
				<label>Use function with signer</label>
				<input type="text" onChange={(e) => setChangeGreeting2(e.target.value)}/>
				<button onClick={handleSetGreeting2}>Set Greeting</button>
				<p>Greeting is "{greeting2}"</p>
				{error && <p>{error2}</p>}
			</div>
		</div>
	);
};

export default RequestsWithHooks;
