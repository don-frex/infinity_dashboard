
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// 1. Get first contact by name ASC directly from DB
	const firstContactDb = await prisma.contact.findFirst({
		orderBy: [{ name: 'asc' }, { id: 'asc' }],
	});
	console.log('DB First Contact (Name ASC):', firstContactDb?.name);

	// 2. Get first contact by name DESC directly from DB
	const firstContactDbDesc = await prisma.contact.findFirst({
		orderBy: [{ name: 'desc' }, { id: 'asc' }],
	});
	console.log('DB First Contact (Name DESC):', firstContactDbDesc?.name);

	// 3. Simulate getContacts logic
	const limit = 50;
	const page = 1;
	const skip = (page - 1) * limit;

	const contactsAsc = await prisma.contact.findMany({
		skip,
		take: limit,
		orderBy: [{ name: 'asc' }, { id: 'asc' }],
	});
	console.log('getContacts First Contact (Name ASC):', contactsAsc[0]?.name);

	const contactsDesc = await prisma.contact.findMany({
		skip,
		take: limit,
		orderBy: [{ name: 'desc' }, { id: 'asc' }],
	});
	console.log('getContacts First Contact (Name DESC):', contactsDesc[0]?.name);

	if (firstContactDb?.name !== contactsAsc[0]?.name) {
		console.error("MISMATCH in ASC sort!");
	}
	if (firstContactDbDesc?.name !== contactsDesc[0]?.name) {
		console.error("MISMATCH in DESC sort!");
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
