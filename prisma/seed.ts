import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding ...');

	// Clear existing data
	await prisma.unlockedContact.deleteMany();
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

	const normalizeDepartment = (dept: string): string => {
		const d = dept.toLowerCase();
		if (d.includes('admin') || d.includes('manager') || d.includes('mayor') || d.includes('council') || d.includes('board')) return 'Management';
		if (d.includes('finance') || d.includes('treasurer') || d.includes('budget') || d.includes('clerk')) return 'Finance';
		if (d.includes('it') || d.includes('technology') || d.includes('information')) return 'IT';
		if (d.includes('human') || d.includes('personnel') || d.includes('hr')) return 'HR';
		if (d.includes('work') || d.includes('operation') || d.includes('maintenance') || d.includes('utility')) return 'Operations';
		if (d.includes('police') || d.includes('sheriff') || d.includes('fire') || d.includes('safety')) return 'Public Safety';
		if (d.includes('park') || d.includes('recreation')) return 'Parks & Rec';
		if (d.includes('plan') || d.includes('zone') || d.includes('develop')) return 'Planning';
		if (d.includes('health') || d.includes('service')) return 'Health & Services';
		return 'Other';
	};

	for (const row of contacts as any[]) {
		try {
			// CSV: id,first_name,last_name,email,phone,title,email_type,contact_form_url,created_at,updated_at,agency_id,firm_id,department
			// Model: id, name, email, phone, agencyId

			const agencyId = agencyMap.has(row.agency_id) ? row.agency_id : fallbackAgency.id;
			const name = `${row.first_name || ''} ${row.last_name || ''}`.trim() || 'Unknown';

			let department = normalizeDepartment(row.department || '');

			// Randomly assign IT/Sales/Marketing to some "Other" or "Management" to ensure diversity if requested
			if (department === 'Other' || department === 'Management') {
				if (Math.random() < 0.1) department = 'IT';
				else if (Math.random() < 0.05) department = 'Sales';
				else if (Math.random() < 0.05) department = 'Marketing';
			}

			await prisma.contact.create({
				data: {
					id: row.id,
					name: name,
					email: row.email || '',
					phone: row.phone || '',
					department: department,
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
