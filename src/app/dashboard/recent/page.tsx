import { getRecentContacts } from '@/app/actions';
import { ContactsTable } from '@/components/ContactsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function RecentPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const params = await searchParams;
	const page = Number(params.page) || 1;
	const limit = 50;

	const { contacts, totalPages } = await getRecentContacts({ page, limit });

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recently Viewed</CardTitle>
			</CardHeader>
			<CardContent>
				<ContactsTable
					contacts={contacts}
					sortBy="createdAt" // Dummy
					sortOrder="desc" // Dummy
					query="" // Dummy
					baseUrl="/dashboard/recent"
				/>
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						disabled={page <= 1}
						asChild
					>
						<Link href={`/dashboard/recent?page=${page - 1}`}>Previous</Link>
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
						<Link href={`/dashboard/recent?page=${page + 1}`}>Next</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
