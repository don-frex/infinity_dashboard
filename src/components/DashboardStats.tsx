import { OverviewHeader } from './dashboard/OverviewHeader';
import { StatsCards } from './dashboard/StatsCards';
import { DepartmentChart } from './dashboard/DepartmentChart';
import { TopAgenciesChart } from './dashboard/TopAgenciesChart';
import { AgencyMap } from './dashboard/AgencyMap';
import { RecentlyViewed } from './dashboard/RecentlyViewed';

export function DashboardStats({
	totalAgencies,
	totalContacts,
	avgEmployees,
	departmentData,
	topAgenciesData,
	mapData,
	recentContacts = [],
}: {
	totalAgencies: number;
	totalContacts: number;
	avgEmployees: number;
	departmentData: { name: string; value: number }[];
	topAgenciesData: { name: string; employees: number }[];
	mapData: { name: string; value: number }[];
	recentContacts?: any[];
}) {
	return (
		<div className="flex flex-col gap-6 p-6">
			{/* Header */}
			<OverviewHeader />

			{/* Stats Row */}
			<StatsCards
				totalAgencies={totalAgencies}
				totalContacts={totalContacts}
				avgEmployees={avgEmployees}
			/>

			{/* Charts Row */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="lg:col-span-1">
					<DepartmentChart data={departmentData} />
				</div>
				<div className="lg:col-span-1">
					<TopAgenciesChart data={topAgenciesData} />
				</div>
				<div className="lg:col-span-1">
					<AgencyMap data={mapData} />
				</div>
			</div>

			{/* Recent Activity Row */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="lg:col-span-1">
					<RecentlyViewed contacts={recentContacts} />
				</div>
			</div>
		</div>
	);
}
