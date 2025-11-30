import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const departments = await prisma.contact.groupBy({
		by: ['department'],
		_count: {
			department: true,
		},
		orderBy: {
			_count: {
				department: 'desc',
			},
		},
		take: 20,
	});

	console.log('Top Departments:');
	departments.forEach((d: any) => {
		console.log(`${d.department || 'NULL'}: ${d._count.department}`);
	});
}

main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
