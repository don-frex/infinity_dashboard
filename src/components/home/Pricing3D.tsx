'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
	{
		name: 'Basic',
		price: 'Free',
		description: 'Essential features for small teams',
		features: [
			'50 Contact Views / Day',
			'Up to 5 Users',
			'Basic Analytics',
			'Email Support',
		],
		buttonText: 'Get Started',
		buttonColor: 'bg-white/10 text-white hover:bg-white/20',
		popular: false,
	},
	{
		name: 'Pro',
		price: '$29',
		period: '/month',
		description: 'Perfect for growing businesses',
		features: [
			'500 Contact Views / Day',
			'Up to 20 Users',
			'Advanced Analytics',
			'Priority Email Support',
			'Advanced Reporting',
		],
		buttonText: 'Start Free Trial',
		buttonColor: 'bg-green-600 text-white hover:bg-green-500',
		popular: true,
	},
	{
		name: 'Enterprise',
		price: '$99',
		period: '/month',
		description: 'For large organizations with specific needs',
		features: [
			'Unlimited Contact Views',
			'Unlimited Users',
			'Custom Analytics',
			'24/7 Phone Support',
			'Custom Branding',
		],
		buttonText: 'Contact Sales',
		buttonColor: 'bg-white/10 text-white hover:bg-white/20',
		popular: false,
	},
];

export function Pricing3D({ isSignedIn }: { isSignedIn: boolean }) {
	return (
		<section id="pricing" className="relative bg-black py-32 text-white overflow-hidden">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-black pointer-events-none" />

			<div className="container relative z-10 mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="mx-auto max-w-2xl text-center mb-16"
				>
					<h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
						Simple, transparent pricing
					</h2>
					<p className="mt-4 text-lg text-gray-400">
						Choose the plan that's right for your business. No hidden fees.
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
					{plans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -10, scale: 1.02 }}
							className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-md transition-all ${plan.popular
									? 'border-green-500/50 bg-green-900/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
									: 'border-white/10 bg-white/5 hover:border-white/20'
								}`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-green-500/50">
									Most Popular
								</div>
							)}
							<div className="mb-4">
								<h3 className="text-xl font-bold text-white">{plan.name}</h3>
								<p className="text-sm text-gray-400">{plan.description}</p>
							</div>
							<div className="mb-6 flex items-baseline gap-1">
								<span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
								{plan.period && <span className="text-sm text-gray-400">{plan.period}</span>}
							</div>
							<ul className="mb-8 flex-1 space-y-4">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
										<Check className="h-5 w-5 text-green-500" />
										{feature}
									</li>
								))}
							</ul>
							<Link
								href={isSignedIn ? "/dashboard" : "/sign-up"}
								className={`w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition-all ${plan.buttonColor}`}
							>
								{plan.buttonText}
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
