'use client';

import { Check, X } from 'lucide-react';

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
		notIncluded: [
			'Unlimited Contact Views',
			'Advanced Reporting',
			'Priority Support',
			'Custom Branding',
			'API Access',
		],
		buttonText: 'Current Plan',
		buttonColor: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
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
		notIncluded: [
			'Unlimited Contact Views',
			'Custom Branding',
			'API Access',
			'Dedicated Account Manager',
		],
		buttonText: 'Upgrade to Pro',
		buttonColor: 'bg-green-600 text-white hover:bg-green-700',
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
			'API Access',
			'Dedicated Account Manager',
		],
		notIncluded: [],
		buttonText: 'Contact Sales',
		buttonColor: 'bg-gray-900 text-white hover:bg-gray-800',
		popular: false,
	},
];

export default function PlansPage() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold text-foreground">Plans Available</h1>
				<p className="text-muted-foreground">Choose the plan that fits your needs.</p>
			</div>

			<div className="grid gap-6 md:grid-cols-3 lg:gap-8">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${plan.popular ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'
							}`}
					>
						{plan.popular && (
							<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
								Most Popular
							</div>
						)}
						<div className="mb-4">
							<h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
							<p className="text-sm text-muted-foreground">{plan.description}</p>
						</div>
						<div className="mb-6 flex items-baseline gap-1">
							<span className="text-3xl font-bold text-foreground">{plan.price}</span>
							{plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
						</div>
						<ul className="mb-6 flex-1 space-y-3">
							{plan.features.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm text-foreground">
									<Check className="h-4 w-4 text-green-500" />
									{feature}
								</li>
							))}
							{plan.notIncluded.map((feature) => (
								<li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground opacity-60">
									<X className="h-4 w-4" />
									{feature}
								</li>
							))}
						</ul>
						<button
							className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${plan.buttonColor}`}
						>
							{plan.buttonText}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
