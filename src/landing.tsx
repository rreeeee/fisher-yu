import React, { useState } from "react";
import "./Home.css";
import { WalletButton } from "./button";
import Logo from "./assets/logo.png";
const Landing: React.FC = () => {
	// State for FAQ items
	const [activeFaq, setActiveFaq] = useState<number | null>(null);

	// State for active tab
	const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

	// Toggle FAQ item
	const toggleFaq = (index: number) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	// Handle wallet connection

	// Handle max button click
	const handleMaxClick = () => {
		console.log("Setting max amount...");
		// Implement max amount logic here
	};

	// Handle stake button click
	const handleStake = () => {
		console.log("Staking BTC...");
		// Implement staking logic here
	};

	// FAQ data
	const faqData = [
		{
			question: "What is liquid staking?",
			answer:
				"Liquid staking allows you to stake your cryptocurrency assets while maintaining liquidity. Instead of locking up your assets, you receive a liquid token representation that can be used across various DeFi protocols.",
		},
		{
			question: "How does BTC liquid staking work?",
			answer:
				"When you stake BTC with pSTAKE, you receive stBTC tokens in return. These stBTC tokens represent your staked BTC and accumulate staking rewards. You can use stBTC across DeFi while your original BTC earns yield.",
		},
		{
			question: "Is my BTC safe when staking?",
			answer:
				"Yes, pSTAKE uses a non-custodial approach, meaning you maintain control of your assets. Our protocol has undergone multiple security audits and employs industry-best practices to protect user funds.",
		},
		{
			question: "What is the unstaking process?",
			answer:
				"To unstake, you simply return your stBTC tokens to receive your original BTC plus accumulated staking rewards. The process typically takes a short unbonding period before funds are available.",
		},
	];

	return (
		<div className="app">
			{/* Header */}
			<header>
				<div className="container">
					<div className="header-content">
						<div className="logo">
							<img src={Logo} />
						</div>
						<nav>
							<ul>
								<li>
									<a href="#">Home</a>
								</li>
								<li>
									<a href="#">Stake</a>
								</li>
								<li>
									<a href="#">Portfolio</a>
								</li>
								<li>
									<a href="#">Docs</a>
								</li>
							</ul>
						</nav>
						<WalletButton />
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="hero">
				<div className="container">
					<h1>
						Earn Yield on Your <span>Bitcoin</span>
					</h1>
					<p>
						pSTAKE's liquid staking protocol allows you to stake your BTC while
						maintaining liquidity. Get the best of both worlds - security and
						flexibility.
					</p>
					<div className="cta-buttons">
						<button>Explore Incentives</button>
						
							<WalletButton />
						
					</div>
					<div className="stats">
						<div className="stat-item">
							<div className="stat-value">15.2%</div>
							<div className="stat-label">Average APY</div>
						</div>
						<div className="stat-item">
							<div className="stat-value">$42.5M</div>
							<div className="stat-label">Total Value Locked</div>
						</div>
						<div className="stat-item">
							<div className="stat-value">12,458</div>
							<div className="stat-label">Active Stakers</div>
						</div>
					</div>
				</div>
			</section>

			{/* Staking Interface */}
			<section className="container">
				<div className="staking-interface">
					<div className="staking-header">
						<h2>Stake Your BTC</h2>
						<div className="tabs">
							<button
								className={`tab ${activeTab === "stake" ? "active" : ""}`}
								onClick={() => setActiveTab("stake")}
							>
								Stake
							</button>
							<button
								className={`tab ${activeTab === "unstake" ? "active" : ""}`}
								onClick={() => setActiveTab("unstake")}
							>
								Unstake
							</button>
						</div>
					</div>
					<div className="staking-form">
						<div className="form-group">
							<label htmlFor="stake-amount">Amount to Stake</label>
							<div className="input-with-max">
								<input type="text" id="stake-amount" placeholder="0.00" />
								<button className="max-button" onClick={handleMaxClick}>
									MAX
								</button>
							</div>
							<div className="form-info">
								<span>Balance: 0.00 BTC</span>
								<span>≈ $0.00</span>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="receive-amount">You Will Receive</label>
							<div className="input-with-max">
								<input
									type="text"
									id="receive-amount"
									placeholder="0.00"
									readOnly
								/>
							</div>
							<div className="form-info">
								<span>stBTC</span>
								<span>Exchange Rate: 1 BTC = 1 stBTC</span>
							</div>
						</div>
						<button className="stake-button" onClick={handleStake}>
							{activeTab === "stake" ? "Stake BTC" : "Unstake BTC"}
						</button>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="benefits">
				<div className="container">
					<div className="section-header">
						<h2>Why Stake with pSTAKE?</h2>
						<p>
							Our liquid staking solution offers unique advantages for Bitcoin
							holders
						</p>
					</div>
					<div className="benefits-grid">
						<div className="benefit-card">
							<div className="benefit-icon">🔄</div>
							<h3>Maintain Liquidity</h3>
							<p>
								Receive stBTC tokens that represent your staked BTC, which you
								can use across DeFi protocols while earning staking rewards.
							</p>
						</div>
						<div className="benefit-card">
							<div className="benefit-icon">💰</div>
							<h3>Earn Dual Yield</h3>
							<p>
								Earn staking rewards on your BTC while also generating
								additional yield by using your stBTC in other DeFi applications.
							</p>
						</div>
						<div className="benefit-card">
							<div className="benefit-icon">🛡️</div>
							<h3>Secure & Trustless</h3>
							<p>
								Our non-custodial protocol ensures you maintain control of your
								assets with industry-leading security measures.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="faq">
				<div className="container">
					<div className="section-header">
						<h2>Frequently Asked Questions</h2>
						<p>Find answers to common questions about BTC liquid staking</p>
					</div>
					<div className="faq-list">
						{faqData.map((faq, index) => (
							<div
								key={index}
								className={`faq-item ${activeFaq === index ? "active" : ""}`}
							>
								<div className="faq-question" onClick={() => toggleFaq(index)}>
									{faq.question}
									<span>{activeFaq === index ? "-" : "+"}</span>
								</div>
								<div className="faq-answer">{faq.answer}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer>
				<div className="container">
					<div className="footer-content">
						<div className="footer-column">
							<h3>pSTAKE</h3>
							<p>
								Liquid staking protocol for Bitcoin and other leading
								Proof-of-Stake assets.
							</p>
							<div className="social-links">
								<a href="#" aria-label="Twitter">
									🐦
								</a>
								<a href="#" aria-label="Discord">
									💬
								</a>
								<a href="#" aria-label="Telegram">
									📱
								</a>
								<a href="#" aria-label="Medium">
									📝
								</a>
							</div>
						</div>
						<div className="footer-column">
							<h3>Products</h3>
							<ul>
								<li>
									<a href="#">BTC Staking</a>
								</li>
								<li>
									<a href="#">ETH Staking</a>
								</li>
								<li>
									<a href="#">ATOM Staking</a>
								</li>
								<li>
									<a href="#">More Assets</a>
								</li>
							</ul>
						</div>
						<div className="footer-column">
							<h3>Resources</h3>
							<ul>
								<li>
									<a href="#">Documentation</a>
								</li>
								<li>
									<a href="#">Blog</a>
								</li>
								<li>
									<a href="#">FAQ</a>
								</li>
								<li>
									<a href="#">Security</a>
								</li>
							</ul>
						</div>
						<div className="footer-column">
							<h3>Company</h3>
							<ul>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Careers</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
								<li>
									<a href="#">Press</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="footer-bottom">
						<p>
							&copy; {new Date().getFullYear()} pSTAKE Finance. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Landing;
