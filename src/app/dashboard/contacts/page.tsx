import { getContacts } from '@/app/actions';
import { ContactsTable } from '@/components/ContactsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search } from '@/components/Search';

export default async function ContactsPage({
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

	const { contacts, totalPages } = await getContacts({ page, limit, sortBy, sortOrder, query });

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Contacts</CardTitle>
					<Search placeholder="Search contacts..." />
				</div>
			</CardHeader>
			<CardContent>
				<ContactsTable contacts={contacts} sortBy={sortBy} sortOrder={sortOrder} query={query} />
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						asChild
					>
						<Link href={`/dashboard/contacts?page=${page - 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&query=${query}`}>Previous</Link>
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
						<Link href={`/dashboard/contacts?page=${page + 1}&sortBy=${sortBy}&sortOrder=${sortOrder}&query=${query}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
