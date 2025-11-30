'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, Globe, Activity, Zap } from 'lucide-react';

export function Dashboard3D() {
	return (
		<div className="relative h-full w-full perspective-1000">
			<motion.div
				initial={{ rotateX: 10, rotateY: -10, scale: 0.9 }}
				whileHover={{ rotateX: 5, rotateY: -5, scale: 0.95 }}
				transition={{ duration: 0.5 }}
				className="absolute inset-4 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl transform-style-3d"
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b border-white/5 pb-4 translate-z-10">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-red-500/50" />
						<div className="h-3 w-3 rounded-full bg-yellow-500/50" />
						<div className="h-3 w-3 rounded-full bg-green-500/50" />
					</div>
					<div className="h-2 w-32 rounded-full bg-white/10" />
				</div>

				<div className="flex flex-1 gap-4">
					{/* Sidebar */}
					<div className="w-16 flex flex-col gap-4 border-r border-white/5 pr-4 translate-z-20">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="h-8 w-8 rounded-lg bg-white/5" />
						))}
					</div>

					{/* Main Content */}
					<div className="flex-1 flex flex-col gap-4">
						{/* Top Stats */}
						<div className="grid grid-cols-3 gap-4">
							{[
								{ color: 'bg-green-500', icon: Activity },
								{ color: 'bg-orange-500', icon: Zap },
								{ color: 'bg-gray-500', icon: Users },
							].map((item, i) => (
								<motion.div
									key={i}
									initial={{ z: 20 }}
									whileHover={{ z: 40 }}
									className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-md transition-all"
								>
									<item.icon className={`h-5 w-5 ${item.color.replace('bg-', 'text-')}`} />
									<div className="h-2 w-12 rounded-full bg-white/10" />
									<div className="h-4 w-8 rounded-full bg-white/20" />
								</motion.div>
							))}
						</div>

						{/* Main Chart Area */}
						<div className="flex-1 rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4 relative overflow-hidden translate-z-10">
							{/* Grid Lines */}
							<div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20">
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="h-px w-full bg-white" />
								))}
							</div>

							{/* Animated Bars */}
							<div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 h-32">
								{[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
									<motion.div
										key={i}
										initial={{ height: 0 }}
										animate={{ height: `${h}%` }}
										transition={{ duration: 1, delay: i * 0.1 }}
										className={`w-full rounded-t-sm ${i % 2 === 0 ? 'bg-green-500' : 'bg-orange-500'} opacity-80`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Floating Elements */}
				<motion.div
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
					className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-500/20 blur-2xl translate-z-0"
				/>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
					className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl translate-z-0"
				/>
			</motion.div>
		</div>
	);
}
