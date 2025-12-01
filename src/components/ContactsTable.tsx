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
	useLocalStorageForRecent,
}: {
	contacts: Contact[];
	sortBy: string;
	sortOrder: 'asc' | 'desc';
	query: string;
	baseUrl?: string;
	useLocalStorageForRecent?: boolean;
}) {
	const [contacts, setContacts] = useState(initialContacts);
	const [revealedContacts, setRevealedContacts] = useState<Record<string, Contact>>({});

	useEffect(() => {
		// Load revealed contacts from localStorage on mount
		const stored = localStorage.getItem('revealedContacts');
		if (stored) {
			setRevealedContacts(JSON.parse(stored));
		}
	}, []);

	useEffect(() => {
		if (useLocalStorageForRecent) {
			// For "Recent" page: use localStorage data if server returns empty/masked data
			const stored = localStorage.getItem('revealedContacts');
			if (stored) {
				const parsed = JSON.parse(stored);
				const recentContacts = Object.values(parsed) as Contact[];
				// Sort by most recently added (mock logic, relying on insertion order or just listing them)
				setContacts(recentContacts.reverse());
			}
		} else {
			// Normal behavior: Merge server contacts with locally revealed contacts
			setContacts(initialContacts.map(c => revealedContacts[c.id] || c));
		}
	}, [initialContacts, revealedContacts, useLocalStorageForRecent]);

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
				const newContact = { ...result.contact, agency: contacts.find(c => c.id === id)?.agency || { name: 'Unknown' } };

				setRevealedContacts(prev => {
					const updated = { ...prev, [id]: newContact };
					localStorage.setItem('revealedContacts', JSON.stringify(updated));
					return updated;
				});

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
