import { getContacts } from '@/app/actions';
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
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default async function ContactsPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 50;
	const result = await getContacts({ page, limit });

	if ('error' in result && result.error === 'LIMIT_REACHED') {
		return (
			<div className="flex flex-col items-center justify-center h-[50vh] gap-4">
				<div className="p-4 rounded-full bg-red-100 text-red-600">
					<Lock className="w-8 h-8" />
				</div>
				<h2 className="text-2xl font-bold">Daily Limit Reached</h2>
				<p className="text-muted-foreground text-center max-w-md">
					You have viewed 50 contacts today. Please upgrade your plan to view more contacts.
				</p>
				<Button size="lg">Upgrade Now</Button>
			</div>
		);
	}

	// Handle potential other errors or empty state
	if ('error' in result) {
		return <div>Error loading contacts</div>;
	}

	const { contacts, totalPages } = result;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Contacts</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Agency</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{contacts.map((contact) => (
							<TableRow key={contact.id}>
								<TableCell className="font-medium">{contact.name}</TableCell>
								<TableCell>{contact.email}</TableCell>
								<TableCell>{contact.phone}</TableCell>
								<TableCell>{contact.agency.name}</TableCell>
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
						<Link href={`/dashboard/contacts?page=${page - 1}`}>Previous</Link>
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
						<Link href={`/dashboard/contacts?page=${page + 1}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
