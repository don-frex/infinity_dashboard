import { DashboardStats } from '@/components/DashboardStats';
import { getDashboardStats, getRecentContacts } from '@/app/actions';

export default async function DashboardPage() {
	const [stats, recentData] = await Promise.all([
		getDashboardStats(),
		getRecentContacts({ limit: 5 }),
	]);

	return <DashboardStats {...stats} recentContacts={recentData.contacts} />;
}
