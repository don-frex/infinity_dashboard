'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
	{ name: 'Female', value: 62, color: '#FFC107' }, // Yellow/Orange as per visual check of prototype donut (large segment looks yellow/orange in some views, but legend says Female Green? Let's stick to visual: Left donut has Yellow and Green. Yellow is smaller? No, Yellow is larger in one view?
	// Let's re-examine image.
	// "Users by Gender": Donut has a large Yellow segment and a smaller Green segment?
	// Wait, the legend says: Female 62%, Male 38%.
	// 62% should be the larger segment.
	// In the image, the Yellow segment looks like ~2/3 (62%).
	// The Green segment looks like ~1/3 (38%).
	// So Female = Yellow (#FFC107), Male = Green (#4CAF50).
	// I will use this mapping.
];

export function UsersByGenderChart() {
	const chartData = [
		{ name: 'Female', value: 62, color: '#FFC107' },
		{ name: 'Male', value: 38, color: '#4CAF50' },
	];

	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Users by Gender</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="flex items-center justify-center">
				<div className="relative h-[200px] w-[200px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={80}
								paddingAngle={0}
								dataKey="value"
								startAngle={90}
								endAngle={-270}
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					{/* Center Text */}
					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className="text-xs text-muted-foreground">Female</span>
						<span className="text-2xl font-bold text-foreground">62%</span>
					</div>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				{chartData.map((item) => (
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
