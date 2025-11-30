'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { revealContact } from '@/app/actions';
import { Eye, Lock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

type Contact = {
	id: string;
	name: string;
	email: string;
	phone: string;
	title: string;
	department: string;
	agency: {
		name: string;
	};
};

export function ContactsTable({
	contacts: initialContacts,
	sortBy,
	sortOrder,
	query,
	baseUrl = '/dashboard/contacts',
}: {
	contacts: Contact[];
	sortBy: string;
	sortOrder: 'asc' | 'desc';
	query: string;
	baseUrl?: string;
}) {
	const [contacts, setContacts] = useState(initialContacts);

	useEffect(() => {
		setContacts(initialContacts);
	}, [initialContacts]);

	const handleView = async (id: string) => {
		try {
			const result = await revealContact(id);
			if ('error' in result && result.error === 'LIMIT_REACHED') {
				toast.error('Daily Limit Reached', {
					description: 'You have used up your 50 credits for today. Please wait 24h or upgrade your plan.',
				});
				return;
			}

			if ('contact' in result && result.contact) {
				setContacts((prev) =>
					prev.map((c) => (c.id === id ? { ...c, ...result.contact, agency: c.agency } : c))
				);
				// Dispatch event to update header credits
				window.dispatchEvent(new Event('credit-update'));
			}
		} catch (error) {
			console.error('Failed to reveal contact', error);
			toast.error('Error', {
				description: 'Failed to reveal contact details.',
			});
		}
	};

	const SortableHeader = ({ label, field, className }: { label: string; field: string; className?: string }) => {
		const isActive = sortBy === field;
		const nextOrder = isActive && sortOrder === 'asc' ? 'desc' : 'asc';

		return (
			<TableHead className={className}>
				<Link
					href={`${baseUrl}?page=1&sortBy=${field}&sortOrder=${nextOrder}&query=${query}`}
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
		<Table className="table-fixed">
			<TableHeader>
				<TableRow>
					<SortableHeader label="Name" field="name" className="w-[250px]" />
					<TableHead className="w-[250px]">Title</TableHead>
					<TableHead className="w-[250px]">Department</TableHead>
					<TableHead className="w-[200px]">Email</TableHead>
					<TableHead className="w-[150px]">Phone</TableHead>
					<TableHead className="w-[100px]">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{contacts.map((contact) => (
					<TableRow key={contact.id}>
						<TableCell className="font-medium">{contact.name}</TableCell>
						<TableCell>{contact.title}</TableCell>
						<TableCell>{contact.department}</TableCell>
						<TableCell>{contact.email}</TableCell>
						<TableCell>{contact.phone}</TableCell>
						<TableCell>
							{contact.email === '******' ? (
								<Button size="sm" onClick={() => handleView(contact.id)}>
									<Eye className="w-4 h-4 mr-2" />
									View
								</Button>
							) : (
								<span className="text-muted-foreground text-sm">Revealed</span>
							)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
