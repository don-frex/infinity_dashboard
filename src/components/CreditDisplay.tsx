'use client';

import { useEffect, useState } from 'react';
import { getUserUsage } from '@/app/actions';

export function CreditDisplay() {
	const [usage, setUsage] = useState<number | null>(null);

	useEffect(() => {
		const fetchUsage = async () => {
			const { count } = await getUserUsage();
			setUsage(count);
		};
		fetchUsage();
	}, []);

	// Listen for custom event to update credits
	useEffect(() => {
		const handleUpdate = () => {
			getUserUsage().then(({ count }) => setUsage(count));
		};
		window.addEventListener('credit-update', handleUpdate);
		return () => window.removeEventListener('credit-update', handleUpdate);
	}, []);

	if (usage === null) return null;

	return (
		<div className="mr-4 flex items-center gap-3">
			<div className="flex flex-col gap-1 w-32">
				<div className="flex justify-between text-xs font-medium text-muted-foreground">
					<span>Credits</span>
					<span>{usage}/50</span>
				</div>
				<div className="h-2 w-full rounded-full bg-secondary">
					<div
						className="h-full rounded-full bg-primary transition-all duration-500"
						style={{ width: `${Math.min((usage / 50) * 100, 100)}%` }}
					/>
				</div>
			</div>
			<button
				className="text-xs font-medium text-primary hover:underline"
				onClick={() => window.location.href = '/dashboard/plans'}
			>
				Free Plan
			</button>
		</div>
	);
}
