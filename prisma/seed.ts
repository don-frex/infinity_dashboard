import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding ...');

	// Clear existing data
	await prisma.contact.deleteMany();
	await prisma.agency.deleteMany();

	// Read Agencies CSV
	const agenciesPath = path.join(__dirname, '../agencies_agency_rows.csv');
	const agenciesFile = fs.readFileSync(agenciesPath, 'utf8');
	const agencies = parse(agenciesFile, {
		columns: true,
		skip_empty_lines: true,
	});

	console.log(`Found ${agencies.length} agencies to seed.`);

	// Insert Agencies
	// Using a map to track inserted IDs to avoid duplicates if any, though ID should be unique
	const agencyMap = new Map();

	for (const row of agencies as any[]) {
		try {
			// Map CSV columns to Prisma model
			// CSV: name,state,state_code,type,population,website,total_schools,total_students,mailing_address,grade_span,locale,csa_cbsa,domain_name,physical_address,phone,status,student_teacher_ratio,supervisory_union,county,created_at,updated_at,id
			// Model: id, name, city, state
			// Note: CSV doesn't seem to have 'city' explicitly in the first few rows, but maybe 'physical_address' or 'mailing_address' contains it?
			// For now, we will leave city empty or try to extract it, or just use state.
			// Let's assume city is not easily available and default to empty string as per schema update.

			const agency = await prisma.agency.create({
				data: {
					id: row.id,
					name: row.name,
					state: row.state || '',
					stateCode: row.state_code || '',
					type: row.type || '',
					population: parseInt(row.population) || 0,
					website: row.website || '',
					city: '', // CSV doesn't have a clear city column in the snippet
				},
			});
			agencyMap.set(row.id, true);
		} catch (e) {
			console.error(`Failed to create agency ${row.name}:`, e);
		}
	}

	// Read Contacts CSV
	const contactsPath = path.join(__dirname, '../contacts_contact_rows.csv');
	const contactsFile = fs.readFileSync(contactsPath, 'utf8');
	const contacts = parse(contactsFile, {
		columns: true,
		skip_empty_lines: true,
	});

	console.log(`Found ${contacts.length} contacts to seed.`);

	// Insert Contacts
	// Create a fallback agency for orphaned contacts
	const fallbackAgency = await prisma.agency.upsert({
		where: { id: '00000000-0000-0000-0000-000000000000' },
		update: {},
		create: {
			id: '00000000-0000-0000-0000-000000000000',
			name: 'Unassigned Agency',
			state: 'Unknown',
			stateCode: 'UN',
			type: 'Unknown',
			population: 0,
		},
	});

	for (const row of contacts as any[]) {
		try {
			// CSV: id,first_name,last_name,email,phone,title,email_type,contact_form_url,created_at,updated_at,agency_id,firm_id,department
			// Model: id, name, email, phone, agencyId

			const agencyId = agencyMap.has(row.agency_id) ? row.agency_id : fallbackAgency.id;
			const name = `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'Unknown';

			await prisma.contact.create({
				data: {
					id: row.id,
					name: name,
					email: row.email || '',
					phone: row.phone || '',
					department: row.department?.trim() || 'Unknown',
					title: row.title?.trim() || 'Unknown',
					agencyId: agencyId,
				},
			});
		} catch (e) {
			console.error(`Failed to create contact ${row.id}:`, e);
		}
	}

	console.log('Seeding finished.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
