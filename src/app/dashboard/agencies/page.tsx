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

export default async function AgenciesPage() {
	const { agencies } = await getAgencies({ page: 1, limit: 50 });

	return (
		<Card>
			<CardHeader>
				<CardTitle>Agencies</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>City</TableHead>
							<TableHead>Created At</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{agencies.map((agency) => (
							<TableRow key={agency.id}>
								<TableCell className="font-medium">{agency.name}</TableCell>
								<TableCell>{agency.city}</TableCell>
								<TableCell>{new Date(agency.createdAt).toLocaleDateString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
