import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

export const useBlockNumber = () => {
	const { library } = useWeb3React();
	const [number, setNumber] = useState<number>(0);

	useEffect(() => {
		const updateBlock = (val: number) => setNumber(val)
		if (library) {
			library.on('block', updateBlock);
		}
	}, [library]);

	return number;
}
