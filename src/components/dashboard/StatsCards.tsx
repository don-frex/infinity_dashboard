'use client';

import { Users, UserPlus, Smartphone, Building2 } from 'lucide-react';

export function StatsCards({
	totalAgencies,
	totalContacts,
	avgEmployees,
}: {
	totalAgencies: number;
	totalContacts: number;
	avgEmployees: number;
}) {
	const stats = [
		{
			name: 'Total Agencies',
			value: totalAgencies.toLocaleString(),
			subtext: 'Registered Agencies',
			icon: Building2,
			color: 'text-green-600',
			bgColor: 'bg-green-100',
		},
		{
			name: 'Total Contacts',
			value: totalContacts.toLocaleString() + '+',
			subtext: 'Employee Contacts',
			icon: Users,
			color: 'text-yellow-600',
			bgColor: 'bg-yellow-100',
		},
		{
			name: 'Avg. Employees',
			value: avgEmployees.toLocaleString(),
			subtext: 'Per Agency',
			icon: UserPlus,
			color: 'text-green-600',
			bgColor: 'bg-green-100',
		},
		// Keeping 4th card as placeholder or maybe "Active Sessions" if we had it, 
		// but let's just duplicate or show something else? 
		// Let's show "Total Departments" if we can pass it, otherwise just keep a placeholder or remove.
		// I'll leave it out for now to have 3 cards, or add a generic one.
		// The grid is 4 columns. 3 cards might look weird if not adjusted.
		// Let's make it 3 columns for the stats row?
		// Or add a "System Status" card.
		{
			name: 'System Status',
			value: 'Active',
			subtext: 'All systems operational',
			icon: Smartphone,
			color: 'text-green-600',
			bgColor: 'bg-green-100',
		},
	];

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => (
				<div
					key={stat.name}
					className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
				>
					<div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor} ${stat.color}`}>
						<stat.icon className="h-6 w-6" />
					</div>
					<div>
						<p className="text-2xl font-bold text-foreground">{stat.value}</p>
						<p className="text-sm text-muted-foreground">{stat.subtext}</p>
					</div>
				</div>
			))}
		</div>
	);
}
