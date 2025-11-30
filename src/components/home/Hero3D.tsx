'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero3D({ isSignedIn }: { isSignedIn: boolean }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

	return (
		<section ref={ref} className="relative min-h-screen overflow-hidden bg-black text-white">
			{/* Background Elements */}
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black/90" />
				<motion.div
					style={{ y, scale, opacity }}
					className="absolute inset-0 flex items-center justify-center opacity-60"
				>
					<div className="absolute inset-0 z-10 bg-[#4CAF50] mix-blend-color opacity-50" />
					{/* Add orange accent overlay */}
					<div className="absolute inset-0 z-20 bg-[#FFC107] mix-blend-overlay opacity-30" />
					<Image
						src="/assets/hero-3d.png"
						alt="3D Infinity Loop"
						fill
						className="object-cover hue-rotate-[-100deg] saturate-150 contrast-125"
						priority
					/>
				</motion.div>
			</div>

			{/* Content */}
			<div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="max-w-4xl"
				>
					<h1 className="bg-gradient-to-r from-green-400 via-gray-200 to-green-600 bg-clip-text text-6xl font-extrabold text-transparent sm:text-8xl md:text-9xl tracking-tighter filter drop-shadow-lg">
						INFINITY
					</h1>
					<p className="mt-6 text-xl text-gray-300 sm:text-2xl font-light tracking-wide">
						The Future of Agency Management is Here.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					className="mt-10 flex flex-col sm:flex-row gap-6"
				>
					<Link
						href={isSignedIn ? "/dashboard" : "/sign-up"}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 border border-white/20"
					>
						<span className="mr-2">{isSignedIn ? 'Go to Dashboard' : 'Get Started'}</span>
						<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
						<div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-600/50 to-orange-600/50 opacity-0 transition-opacity group-hover:opacity-100" />
					</Link>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ repeat: Infinity, duration: 2 }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2"
			>
				<div className="h-10 w-6 rounded-full border-2 border-white/30 flex justify-center p-1">
					<div className="h-2 w-1 rounded-full bg-white" />
				</div>
			</motion.div>
		</section>
	);
}
