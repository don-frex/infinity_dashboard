'use client';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts';

const data = [
	{ name: 'Restaurants', value: 800 },
	{ name: 'Cart', value: 936 },
	{ name: 'Map', value: 800 },
	{ name: 'Promotions', value: 1200 },
	{ name: 'User Profile', value: 700 },
	{ name: 'Other', value: 400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg bg-black p-2 text-white shadow-lg">
				<p className="text-xs font-medium">{label}</p>
				<p className="text-sm font-bold">{payload[0].value}</p>
			</div>
		);
	}
	return null;
};

export function PageTrafficChart() {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Page Traffic</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						layout="vertical"
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<XAxis type="number" hide />
						<YAxis
							dataKey="name"
							type="category"
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#94a3b8', fontSize: 12 }}
							width={80}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={8}>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={entry.name === 'Cart' ? '#2E7D32' : '#4CAF50'} // Highlight Cart if needed, or just all green
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
