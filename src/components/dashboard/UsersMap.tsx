'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Using a generic world map or similar if available, otherwise a placeholder.
// Since we don't have a reliable offline topojson for Poland, we'll use a placeholder visual.
// But wait, the project already has `react-simple-maps`.
// Let's try to make a nice placeholder that looks like the map container.

const data = [
	{ name: 'Masovian', value: '30%' },
	{ name: 'Wielkopolska', value: '23%' },
	{ name: 'Malopolska', value: '18%' },
	{ name: 'Lublin', value: '12%' },
	{ name: 'Lodz', value: '8%' },
	{ name: 'Podlaska', value: '6%' },
	{ name: 'Other', value: '3%' },
];

export function UsersMap() {
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Users by Voivodeship</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
				{/* Map Placeholder */}
				<div className="flex h-[250px] flex-1 items-center justify-center rounded-lg bg-gray-50">
					<span className="text-sm text-muted-foreground">Map Visualization Placeholder</span>
					{/* Ideally we would load a Poland TopoJSON here */}
				</div>

				{/* Legend/Data */}
				<div className="w-full lg:w-48 space-y-3">
					{data.map((item) => (
						<div key={item.name} className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-green-500"></span>
								<span className="text-muted-foreground">{item.name}</span>
							</div>
							<span className="font-bold text-foreground">{item.value}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
