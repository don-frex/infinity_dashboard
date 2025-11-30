'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
	{ name: '18-24', value: 12, color: '#A5D6A7' },
	{ name: '25-34', value: 44, color: '#4CAF50' }, // Main green
	{ name: '35-44', value: 26, color: '#66BB6A' },
	{ name: '45-54', value: 16, color: '#81C784' },
	{ name: '55+', value: 2, color: '#C8E6C9' },
];

export function AgeOfUsersChart() {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Age of Users</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="flex items-center justify-center">
				<div className="relative h-[200px] w-[200px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={80}
								paddingAngle={2}
								dataKey="value"
								startAngle={90}
								endAngle={-270}
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				{data.map((item) => (
					<div key={item.name} className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<span
								className="h-2 w-2 rounded-full"
								style={{ backgroundColor: item.color }}
							></span>
							<span className="text-muted-foreground">{item.name}</span>
						</div>
						<span className="font-bold text-foreground">{item.value}%</span>
					</div>
				))}
			</div>
		</div>
	);
}
