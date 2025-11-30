import { DashboardStats } from '@/components/DashboardStats';
import { getDashboardStats } from '@/app/actions';

export default async function DashboardPage() {
	const stats = await getDashboardStats();
	return <DashboardStats {...stats} />;
}
