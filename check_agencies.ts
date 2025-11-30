import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const totalAgencies = await prisma.agency.count();
	console.log(`Total agencies: ${totalAgencies}`);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
