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

export default async function AgenciesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const sortBy = params.sortBy || 'name';
	const sortOrder = params.sortOrder || 'asc';
	const limit = 50;

	const { agencies, totalPages } = await getAgencies({ page, limit, sortBy, sortOrder });

	const SortableHeader = ({ label, field }: { label: string; field: string }) => {
		const isActive = sortBy === field;
		const nextOrder = isActive && sortOrder === 'asc' ? 'desc' : 'asc';

		return (
			<TableHead>
				<Link
					href={`/dashboard/agencies?page=1&sortBy=${field}&sortOrder=${nextOrder}`}
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
				<CardTitle>Agencies</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<SortableHeader label="Name" field="name" />
							<SortableHeader label="State" field="state" />
							<SortableHeader label="State Code" field="stateCode" />
							<SortableHeader label="Type" field="type" />
							<SortableHeader label="Population" field="population" />
							<TableHead>Website</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{agencies.map((agency) => (
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
						<Link href={`/dashboard/agencies?page=${page - 1}&sortBy=${sortBy}&sortOrder=${sortOrder}`}>Previous</Link>
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
						<Link href={`/dashboard/agencies?page=${page + 1}&sortBy=${sortBy}&sortOrder=${sortOrder}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
