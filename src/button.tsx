import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import {
	arbitrum,
	mainnet,
	polygon,
	base,
	optimism,
} from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Get projectId from https://cloud.reown.com
const projectId = "82b296b7d712acc790fff2b98e8e755f";

// 2. Create wagmiConfig
const metadata = {
	name: "My DApp",
	description: "My DApp Description",
	url: "https://mydapp.com",
	icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networks = [mainnet, arbitrum, polygon, base, optimism];
const wagmiAdapter = new WagmiAdapter({
	networks,
	projectId,
	ssr: false,
});

// 3. Create modal
createAppKit({
	adapters: [wagmiAdapter],
	networks,
	projectId,
	metadata,
	features: {
		analytics: true,
	},
});

const queryClient = new QueryClient();

export function WalletButton() {
	const navigate = useNavigate();

	const [address, setAddress] = useState(null);
	const [isConnected, setIsConnected] = useState(false);
	const [chainId, setChainId] = useState(null);

	useEffect(() => {
		// Listen to account changes
		const checkConnection = async () => {
			try {
				const accounts = await wagmiAdapter.wagmiConfig
					.getClient()
					.getAddresses();
				const chain = await wagmiAdapter.wagmiConfig.getClient().getChainId();

                if (accounts && accounts.length > 0) {
                    console.log(accounts[0], isConnected, 'true');
					setAddress(accounts[0]);
					setIsConnected(true);
					setChainId(chain);
					console.log("gets here");
				}
			} catch (error) {
                console.log("Not connected");
			}
		};

		checkConnection();
        console.log(chainId)
		// Subscribe to account changes
		const unwatch = wagmiAdapter.wagmiConfig.subscribe(
			(state) => state.current,
			() => checkConnection()
		);

		return () => unwatch();
	}, []);
  
	return (
		<div className="space-y-4" onClick={() => setTimeout(() => navigate("connect"), 3000)}>
			<appkit-button />
			{isConnected && address && (
				<div className="bg-green-50 border border-green-200 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-green-800 mb-2">
						Connected Wallet
					</h3>
					<div className="space-y-2 text-sm">
						<p className="text-gray-700">
							<span className="font-medium">Address:</span>{" "}
							<span className="font-mono text-xs break-all">{address}</span>
						</p>
						{chainId && (
							<p className="text-gray-700">
								<span className="font-medium">Chain ID:</span> {chainId}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default function App() {
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Web3 Wallet Connection
							</h1>
							<p className="text-gray-600">
								Connect your wallet to get started
							</p>
						</div>

						<WalletButton />

						<div className="mt-8 pt-6 border-t border-gray-200">
							<p className="text-xs text-gray-500 text-center">
								Powered by Reown AppKit
							</p>
						</div>
					</div>
				</div>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
