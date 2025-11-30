import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const total = await prisma.contact.count();
	const emptyTitles = await prisma.contact.count({
		where: {
			title: ''
		}
	});
	const emptyDepartments = await prisma.contact.count({
		where: {
			department: ''
		}
	});

	console.log(`Total contacts: ${total}`);
	console.log(`Empty titles: ${emptyTitles}`);
	console.log(`Empty departments: ${emptyDepartments}`);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
