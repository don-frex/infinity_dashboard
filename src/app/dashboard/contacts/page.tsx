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

export default async function ContactsPage() {
	const result = await getContacts({ page: 1, limit: 50 });

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

	const { contacts } = result;

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
			</CardContent>
		</Card>
	);
}
