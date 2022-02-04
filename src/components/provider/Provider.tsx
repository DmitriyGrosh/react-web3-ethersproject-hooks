import React, { FC } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

import AutoConnect from "./AutoConnect";


const Provider: FC = ({ children }) => {

	return (
		<Web3ReactProvider getLibrary={(provider: any) => new Web3Provider(provider)}>
			<AutoConnect />
			{children}
		</Web3ReactProvider>
	);
};

export default Provider;
