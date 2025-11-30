import { getAgencies } from '@/app/actions';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Search } from '@/components/Search';

export default async function AgenciesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; sortBy?: string; sortOrder?: 'asc' | 'desc'; query?: string }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const sortBy = params.sortBy || 'name';
	const sortOrder = params.sortOrder || 'asc';
	const query = params.query || '';
	const limit = 50;

	const { agencies, totalPages } = await getAgencies({ page, limit, sortBy, sortOrder, query });

	const SortableHeader = ({ label, field, className }: { label: string; field: string; className?: string }) => {
		const isActive = sortBy === field;
		const nextOrder = isActive && sortOrder === 'asc' ? 'desc' : 'asc';

		return (
			<TableHead className={className}>
				<Link
					href={`/dashboard/agencies?page=1&sortBy=${field}&sortOrder=${nextOrder}&query=${query}`}
					className="flex items-center gap-1 hover:text-foreground"
				>
					{label}
					{isActive ? (
						sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
					) : (
						<ArrowUpDown className="h-4 w-4 opacity-50" />
					)}
				</Link>
			</TableHead>
		);
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Agencies</CardTitle>
					<Search placeholder="Search agencies..." />
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<SortableHeader label="Name" field="name" className="w-[300px]" />
							<SortableHeader label="State" field="state" className="w-[150px]" />
							<SortableHeader label="State Code" field="stateCode" className="w-[120px]" />
							<SortableHeader label="Type" field="type" className="w-[200px]" />
							<SortableHeader label="Population" field="population" className="w-[150px]" />
							<TableHead className="w-[100px]">Website</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{agencies.map((agency: any) => (
							<TableRow key={agency.id}>
								<TableCell className="font-medium">{agency.name}</TableCell>
								<TableCell>{agency.state}</TableCell>
								<TableCell>{agency.stateCode}</TableCell>
								<TableCell>{agency.type}</TableCell>
								<TableCell>{(agency.population || 0).toLocaleString()}</TableCell>
								<TableCell>
									{agency.website ? (
										<a
											href={agency.website}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											Visit
										</a>
									) : (
										'-'
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						asChild
					>
						<Link href={`/dashboard/agencies?page=${page - 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&query=${query}`}>Previous</Link>
					</Button>
					<div className="text-sm text-muted-foreground">
						Page {page} of {totalPages}
					</div>
					<Button
						variant="outline"
						size="sm"
						disabled={page >= totalPages}
						asChild
					>
						<Link href={`/dashboard/agencies?page=${page + 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&query=${query}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
