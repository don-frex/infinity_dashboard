'use client';

import { useAuth } from '@clerk/nextjs';
import { Hero3D } from '@/components/home/Hero3D';
import { Features3D } from '@/components/home/Features3D';
import { Pricing3D } from '@/components/home/Pricing3D';
import Link from 'next/link';

export default function Home() {
	const { isSignedIn } = useAuth();

	return (
		<div className="flex min-h-screen flex-col bg-black text-white selection:bg-green-500/30">
			{/* Header */}
			<header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2 font-bold text-xl tracking-tight">
						<div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg shadow-green-500/20">
							<div className="h-4 w-4 rounded-full bg-white/20" />
						</div>
						<span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">INFINITY</span>
					</div>
					<nav className="flex items-center gap-4">
						{isSignedIn ? (
							<Link
								href="/dashboard"
								className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 border border-white/10"
							>
								Dashboard
							</Link>
						) : (
							<>
								<Link
									href="/sign-in"
									className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
								>
									Sign In
								</Link>
								<Link
									href="/sign-up"
									className="rounded-full bg-white text-black px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
								>
									Get Started
								</Link>
							</>
						)}
					</nav>
				</div>
			</header>

			<main className="flex-1">
				<Hero3D isSignedIn={!!isSignedIn} />
				<Features3D />
				<Pricing3D isSignedIn={!!isSignedIn} />
			</main>

			{/* Footer */}
			<footer className="border-t border-white/10 bg-black py-12">
				<div className="container mx-auto px-4 text-center text-sm text-gray-500">
					<p>&copy; {new Date().getFullYear()} Infinity Dashboard. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
