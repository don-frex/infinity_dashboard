'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

export function AgencyMap({
	data,
}: {
	data: { name: string; value: number }[];
}) {
	const maxValue = Math.max(...data.map((d) => d.value), 1);
	const colorScale = scaleLinear<string>()
		.domain([0, maxValue])
		.range(['#E8F5E9', '#2E7D32']); // Light green to Dark green

	return (
		<div className="rounded-xl bg-white p-6 shadow-sm h-full flex flex-col">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Agency Distribution</h3>
				<button className="text-muted-foreground hover:text-foreground">...</button>
			</div>
			<div className="flex-1 w-full min-h-[200px]">
				<ComposableMap projection="geoAlbersUsa">
					<Geographies geography={geoUrl}>
						{({ geographies }: { geographies: any[] }) =>
							geographies.map((geo: any) => {
								const cur = data.find((s) => s.name === geo.properties.name);
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										fill={cur ? colorScale(cur.value) : '#F1F5F9'} // Default light grey
										stroke="#FFFFFF"
										strokeWidth={0.5}
										style={{
											default: { outline: 'none' },
											hover: { fill: '#FFC107', outline: 'none' }, // Yellow on hover
											pressed: { outline: 'none' },
										}}
									/>
								);
							})
						}
					</Geographies>
				</ComposableMap>
			</div>
		</div>
	);
}
