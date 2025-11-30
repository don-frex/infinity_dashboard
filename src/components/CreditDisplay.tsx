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
		<div className="mr-4 text-sm font-medium">
			Credits Used: {usage}/50
			<button className="ml-2 text-blue-500 hover:underline" onClick={() => window.location.href = '/dashboard/plans'}>Free Plan</button>
		</div>
	);
}
