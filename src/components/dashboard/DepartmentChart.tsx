'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#4CAF50', '#FFC107', '#81C784', '#FFD54F', '#2E7D32'];

export function DepartmentChart({
	data,
}: {
	data: { name: string; value: number }[];
}) {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm h-full">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Department Breakdown</h3>
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
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
				{data.map((item, index) => (
					<div key={item.name} className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<span
								className="h-2 w-2 rounded-full"
								style={{ backgroundColor: COLORS[index % COLORS.length] }}
							></span>
							<span className="text-muted-foreground truncate max-w-[120px]">{item.name}</span>
						</div>
						<span className="font-bold text-foreground">{item.value}</span>
					</div>
				))}
			</div>
		</div>
	);
}
