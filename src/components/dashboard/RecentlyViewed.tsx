import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';

export function RecentlyViewed({
	contacts: initialContacts,
}: {
	contacts: any[];
}) {
	const [contacts, setContacts] = useState(initialContacts);

	useEffect(() => {
		// Load revealed contacts from localStorage to supplement server data
		// This is needed for Vercel demo where DB is read-only
		const stored = localStorage.getItem('revealedContacts');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				const localContacts = Object.values(parsed);

				// If server returned no contacts (likely due to read-only DB), use local ones
				if (initialContacts.length === 0 && localContacts.length > 0) {
					// Sort by most recently added (mock logic) and take top 5
					setContacts(localContacts.reverse().slice(0, 5));
				} else {
					setContacts(initialContacts);
				}
			} catch (e) {
				console.error('Error parsing local contacts:', e);
			}
		}
	}, [initialContacts]);

	return (
		<div className="rounded-xl bg-white p-6 shadow-sm h-full flex flex-col">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-foreground">Recently Viewed</h3>
				<Link href="/dashboard/recent" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
					See More <ArrowRight className="h-4 w-4" />
				</Link>
			</div>
			<div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] custom-scrollbar">
				{contacts.length === 0 ? (
					<div className="flex h-full items-center justify-center text-muted-foreground text-sm">
						No recently viewed contacts.
					</div>
				) : (
					contacts.map((contact: any) => (
						<div key={contact.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
								<User className="h-5 w-5 text-gray-500" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="truncate text-sm font-medium text-foreground">{contact.name}</p>
								<p className="truncate text-xs text-muted-foreground">{contact.title} at {contact.agency?.name}</p>
							</div>
							<div className="text-xs text-muted-foreground">
								{/* We could show time here if available in the future */}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
