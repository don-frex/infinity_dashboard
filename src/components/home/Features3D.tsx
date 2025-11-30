'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dashboard3D } from './Dashboard3D';

const features = [
	{
		title: 'Immersive Dashboard',
		description: 'Experience data like never before with our 3D-accelerated interface.',
		image: '/assets/feature-dashboard-green.png',
		align: 'left',
	},
	{
		title: 'Holographic Contacts',
		description: 'Visualize your network in a stunning 3D space. Connect deeper.',
		image: '/assets/feature-contacts.png',
		align: 'right',
	},
];

export function Features3D() {
	return (
		<section className="bg-black py-32 text-white overflow-hidden">
			<div className="container mx-auto px-4">
				{features.map((feature, index) => (
					<div
						key={feature.title}
						className={`mb-32 flex flex-col items-center gap-12 lg:flex-row ${feature.align === 'right' ? 'lg:flex-row-reverse' : ''}`}
					>
						<motion.div
							initial={{ opacity: 0, x: feature.align === 'left' ? -50 : 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8 }}
							className="flex-1"
						>
							<div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm group perspective-1000">
								{feature.title === 'Immersive Dashboard' ? (
									<Dashboard3D />
								) : (
									<>
										{/* Green tint overlay for all images, stronger for contacts to kill blue */}
										<div className={`absolute inset-0 z-10 bg-[#4CAF50] mix-blend-color ${feature.image.includes('contacts') ? 'opacity-60' : 'opacity-40'} transition-opacity duration-500`} />
										<div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-orange-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
										<Image
											src={feature.image}
											alt={feature.title}
											fill
											className={`object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-y-12 ${feature.image.includes('contacts') ? 'hue-rotate-[-100deg] saturate-150 contrast-125' : 'hue-rotate-[-100deg] saturate-150 contrast-125'}`}
										/>
									</>
								)}
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="flex-1 text-center lg:text-left"
						>
							<h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
								{feature.title}
							</h2>
							<p className="mt-6 text-lg text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					</div>
				))}
			</div>
		</section>
	);
}
