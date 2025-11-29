'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Building2, Users, LayoutDashboard } from 'lucide-react';

const navItems = [
	{ name: 'Agencies', href: '/dashboard/agencies', icon: Building2 },
	{ name: 'Contacts', href: '/dashboard/contacts', icon: Users },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="flex h-full w-64 flex-col border-r bg-muted/10">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link href="/" className="flex items-center gap-2 font-semibold">
					<LayoutDashboard className="h-6 w-6" />
					<span className="">Dashboard</span>
				</Link>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
								pathname === item.href
									? 'bg-muted text-primary'
									: 'text-muted-foreground'
							)}
						>
							<item.icon className="h-4 w-4" />
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
}
