'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Building2, Users, LayoutDashboard, History, Settings, FileText, Mail, CreditCard } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Logo } from '@/components/Logo';

const navItems = [
	{ name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Agencies', href: '/dashboard/agencies', icon: Building2 }, // Mapping to "Invoices" or similar from prototype
	{ name: 'Contacts', href: '/dashboard/contacts', icon: Users }, // Mapping to "Reports" or similar
	{ name: 'Recently Viewed', href: '/dashboard/recent', icon: History },
	// Adding some placeholder items to match prototype density if needed, but sticking to real routes is better.
	// Let's add "Settings" as it's common.
	// { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
	const pathname = usePathname();
	const { user } = useUser();

	return (
		<div className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
			{/* Logo Section */}
			<div className="flex h-20 items-center px-6">
				<Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight">
					<Logo variant="dark" />
				</Link>
			</div>

			{/* Navigation Section */}
			<div className="flex-1 px-4 py-4">
				<div className="mb-4 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden">
					Menu
				</div>
				<nav className="space-y-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
									isActive
										? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
										: 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
								)}
							>
								<item.icon className={cn("h-5 w-5", isActive ? "text-sidebar-accent-foreground" : "text-muted-foreground")} />
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* Secondary Nav (Visual only to match prototype density) */}
				<div className="mt-8">
					<nav className="space-y-1">
						<Link
							href="/dashboard/plans"
							className={cn(
								'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all',
								pathname === '/dashboard/plans'
									? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
									: 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
							)}
						>
							<CreditCard className="h-5 w-5 text-muted-foreground" />
							Plans Available
						</Link>
						<div className={cn(
							'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground cursor-not-allowed opacity-70'
						)}>
							<Mail className="h-5 w-5 text-muted-foreground" />
							Inbox
						</div>
						<div className={cn(
							'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground cursor-not-allowed opacity-70'
						)}>
							<Settings className="h-5 w-5 text-muted-foreground" />
							Settings
						</div>
					</nav>
				</div>
			</div>

			{/* User Profile Section */}
			<div className="border-t p-4">
				<div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/30 p-3">
					<UserButton afterSignOutUrl="/" />
					<div className="flex flex-col overflow-hidden">
						<span className="truncate text-sm font-medium text-foreground">
							{user?.fullName || 'User'}
						</span>
						<span className="truncate text-xs text-muted-foreground">
							Manager
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
