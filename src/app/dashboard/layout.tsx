import { Sidebar } from '@/components/Sidebar';
import { UserButton } from '@clerk/nextjs';
import { CreditDisplay } from '@/components/CreditDisplay';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
			<div className="hidden border-r bg-muted/40 md:block h-full overflow-y-auto">
				<Sidebar />
			</div>
			<div className="flex flex-col h-full overflow-hidden">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 flex-shrink-0">
					<div className="w-full flex-1">
						{/* Add breadcrumb or title here if needed */}
					</div>
					<CreditDisplay />
					<UserButton />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#e1e3e8] overflow-y-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
