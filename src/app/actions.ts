'use server';

import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function getAgencies({
	page = 1,
	limit = 10,
	sortBy = 'name',
	sortOrder = 'asc',
}: {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}) {
	const skip = (page - 1) * limit;

	// Validate sortBy field to prevent injection or errors
	const validSortFields = ['name', 'state', 'stateCode', 'type', 'population'];
	const orderByField = validSortFields.includes(sortBy) ? sortBy : 'name';

	const [agencies, total] = await Promise.all([
		prisma.agency.findMany({
			skip,
			take: limit,
			orderBy: { [orderByField]: sortOrder },
		}),
		prisma.agency.count(),
	]);

	return { agencies, total, totalPages: Math.ceil(total / limit) };
}

export async function getContacts({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error('Unauthorized');
	}

	// Check usage limit
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

	// Increment usage by the requested limit (cost of the operation)
	await prisma.userUsage.upsert({
		where: {
			userId_date: {
				userId,
				date: today,
			},
		},
		update: {
			count: {
				increment: limit,
			},
		},
		create: {
			userId,
			date: today,
			count: limit,
		},
	});

	const skip = (page - 1) * limit;
	const [contacts, total] = await Promise.all([
		prisma.contact.findMany({
			skip,
			take: limit,
			include: { agency: true },
			orderBy: { name: 'asc' },
		}),
		prisma.contact.count(),
	]);

	return { contacts, total, totalPages: Math.ceil(total / limit) };
}
