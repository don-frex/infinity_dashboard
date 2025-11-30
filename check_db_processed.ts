import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const contacts = await prisma.contact.findMany({
		take: 5,
		include: {
			agency: true,
		}
	});

	const processedContacts = contacts.map((contact) => ({
		...contact,
		name: contact.name.charAt(0) + '***',
		email: contact.email.charAt(0) + '***',
		phone: contact.phone.charAt(0) + '***',
	}));

	console.log(JSON.stringify(processedContacts, null, 2));
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
