'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
	{ name: 'Android', value: 56, color: '#4CAF50' }, // Green
	{ name: 'Apple iOS', value: 44, color: '#FFC107' }, // Yellow
];

export function OSMetricsChart() {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">OS Metrics</h3>
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
								paddingAngle={0}
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
