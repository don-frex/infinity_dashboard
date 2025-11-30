import { getContacts } from '@/app/actions';
import { ContactsTable } from '@/components/ContactsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ContactsPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const sortBy = (params.sortBy as string) || 'name';
	const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'asc';
	const limit = 50;
	const { contacts, totalPages } = await getContacts({ page, limit, sortBy, sortOrder });

	return (
		<Card>
			<CardHeader>
				<CardTitle>Contacts</CardTitle>
			</CardHeader>
			<CardContent>
				<ContactsTable contacts={contacts} sortBy={sortBy} sortOrder={sortOrder} />
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						asChild
					>
						<Link href={`/dashboard/contacts?page=${page - 1}&sortBy=${sortBy}&sortOrder=${sortOrder}`}>Previous</Link>
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
						<Link href={`/dashboard/contacts?page=${page + 1}&sortBy=${sortBy}&sortOrder=${sortOrder}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
