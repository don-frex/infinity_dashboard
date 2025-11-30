'use client';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts';

const data = [
	{ time: '00:00', install: 100, remove: 50 },
	{ time: '04:00', install: 150, remove: 80 },
	{ time: '08:00', install: 120, remove: 60 },
	{ time: '12:00', install: 250, remove: 100 },
	{ time: '13:48', install: 212, remove: 120 }, // Specific point from prototype
	{ time: '16:00', install: 180, remove: 90 },
	{ time: '20:00', install: 220, remove: 110 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg bg-black p-2 text-white shadow-lg">
				<p className="text-xs font-medium">{label}</p>
				<p className="text-sm font-bold">Installs: {payload[0].value}</p>
			</div>
		);
	}
	return null;
};

export function AppInstallationChart() {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">App Installation</h3>
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<span className="h-2 w-2 rounded-full bg-green-600"></span>
						<span>Install</span>
					</div>
					<div className="flex items-center gap-1">
						<span className="h-2 w-2 rounded-full bg-gray-300"></span>
						<span>Remove</span>
					</div>
				</div>
			</div>
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
						<XAxis
							dataKey="time"
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#94a3b8', fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#94a3b8', fontSize: 12 }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Line
							type="monotone"
							dataKey="install"
							stroke="#2E7D32"
							strokeWidth={2}
							dot={{ r: 4, fill: '#2E7D32', strokeWidth: 0 }}
							activeDot={{ r: 6, strokeWidth: 0 }}
						/>
						<Line
							type="monotone"
							dataKey="remove"
							stroke="#CBD5E1"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
