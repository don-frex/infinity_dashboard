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

const COLORS = ['#4CAF50', '#FFC107', '#81C784', '#FFD54F', '#2E7D32'];

export function TopAgenciesChart({
	data,
}: {
	data: { name: string; employees: number }[];
}) {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm h-full flex flex-col">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Top Agencies by Size</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="flex-1 w-full min-h-[300px]">
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
							width={100}
						/>
						<Tooltip
							contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
						/>
						<Bar dataKey="employees" radius={[0, 4, 4, 0]} barSize={12}>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
