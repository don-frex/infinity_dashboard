'use server';

import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function getAgencies({
	page = 1,
	limit = 10,
	sortBy = 'name',
	sortOrder = 'asc',
	query = '',
}: {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	query?: string;
}) {
	const skip = (page - 1) * limit;

	// Validate sortBy field to prevent injection or errors
	const validSortFields = ['name', 'state', 'stateCode', 'type', 'population'];
	const orderByField = validSortFields.includes(sortBy) ? sortBy : 'name';

	const where: any = {};
	if (query) {
		where.OR = [
			{ name: { contains: query } },
			{ state: { contains: query } },
			{ stateCode: { contains: query } },
			{ type: { contains: query } },
		];
	}

	const [agencies, total] = await Promise.all([
		prisma.agency.findMany({
			skip,
			take: limit,
			where,
			orderBy: { [orderByField]: sortOrder },
		}),
		prisma.agency.count({ where }),
	]);

	return { agencies, total, totalPages: Math.ceil(total / limit) };
}

export async function getContacts({
	page = 1,
	limit = 50,
	sortBy = 'name',
	sortOrder = 'asc',
	query = '',
}: {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	query?: string;
}) {
	const { userId } = await auth();
	if (!userId) {
		return { contacts: [], totalPages: 0 };
	}

	const validSortFields = ['name', 'title', 'department', 'agency'];
	const safeSortBy = validSortFields.includes(sortBy) ? sortBy : 'name';

	let orderBy: any = {};
	if (safeSortBy === 'agency') {
		orderBy = { agency: { name: sortOrder } };
	} else {
		orderBy = { [safeSortBy]: sortOrder };
	}

	const where: any = {};
	if (query) {
		where.OR = [
			{ name: { contains: query } },
			{ title: { contains: query } },
			{ department: { contains: query } },
			{ agency: { name: { contains: query } } },
		];
	}

	const contacts = await prisma.contact.findMany({
		skip: (page - 1) * limit,
		take: limit,
		where,
		include: {
			agency: true,
			unlockedBy: {
				where: {
					userId: userId,
				},
			},
		},
		orderBy: [
			orderBy,
			{ id: 'asc' },
		],
	});

	const totalContacts = await prisma.contact.count({ where });
	const totalPages = Math.ceil(totalContacts / limit);

	// Mask sensitive data by default, unless unlocked
	const processedContacts = contacts.map((contact) => {
		const isUnlocked = contact.unlockedBy.length > 0;
		return {
			...contact,
			email: isUnlocked ? contact.email : '******',
			phone: isUnlocked ? contact.phone : '******',
			title: isUnlocked ? contact.title : '******',
			department: isUnlocked ? contact.department : '******',
		};
	});

	return { contacts: processedContacts, totalPages };
}

export async function revealContact(contactId: string) {
	const { userId } = await auth();
	if (!userId) throw new Error('Unauthorized');

	// Check if already unlocked
	const existingUnlock = await prisma.unlockedContact.findUnique({
		where: {
			userId_contactId: {
				userId,
				contactId,
			},
		},
	});

	const contact = await prisma.contact.findUnique({
		where: { id: contactId },
	});

	if (existingUnlock) {
		return { contact };
	}

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const usage = await prisma.userUsage.findUnique({
		where: {
			userId_date: {
				userId,
				date: today,
			},
		},
	});

	if (usage && usage.count >= 50) {
		return { error: 'LIMIT_REACHED' };
	}

	// Increment usage and unlock contact
	await prisma.$transaction([
		prisma.userUsage.upsert({
			where: {
				userId_date: {
					userId,
					date: today,
				},
			},
			update: {
				count: {
					increment: 1,
				},
			},
			create: {
				userId,
				date: today,
				count: 1,
			},
		}),
		prisma.unlockedContact.create({
			data: {
				userId,
				contactId,
			},
		}),
	]);

	return { contact };
}

export async function getUserUsage() {
	const { userId } = await auth();
	if (!userId) return { count: 0 };

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const usage = await prisma.userUsage.findUnique({
		where: {
			userId_date: {
				userId,
				date: today,
			},
		},
	});

	return { count: usage?.count || 0 };
}
