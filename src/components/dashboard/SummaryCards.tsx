import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, UserCheck } from 'lucide-react';

export function SummaryCards({
	totalAgencies,
	totalContacts,
	avgEmployees,
}: {
	totalAgencies: number;
	totalContacts: number;
	avgEmployees: number;
}) {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card className="bg-[#1e293b] border-slate-800 text-slate-100 shadow-lg shadow-blue-900/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-400">
						Total Agencies
					</CardTitle>
					<Building2 className="h-4 w-4 text-blue-400" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-white">{totalAgencies}</div>
					<p className="text-xs text-slate-500">Registered Agencies</p>
				</CardContent>
			</Card>
			<Card className="bg-[#1e293b] border-slate-800 text-slate-100 shadow-lg shadow-purple-900/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-400">
						Total Contacts
					</CardTitle>
					<Users className="h-4 w-4 text-purple-400" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-white">
						{totalContacts.toLocaleString()}
					</div>
					<p className="text-xs text-slate-500">Total Employees</p>
				</CardContent>
			</Card>
			<Card className="bg-[#1e293b] border-slate-800 text-slate-100 shadow-lg shadow-emerald-900/10">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium text-slate-400">
						Avg Employees
					</CardTitle>
					<UserCheck className="h-4 w-4 text-emerald-400" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-white">{avgEmployees}</div>
					<p className="text-xs text-slate-500">Per Agency</p>
				</CardContent>
			</Card>
		</div>
	);
}
