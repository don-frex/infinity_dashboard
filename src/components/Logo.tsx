import React from 'react';

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'dark' }) {
	const gradientStyle = variant === 'dark'
		? 'linear-gradient(to right, #1a1a1a, #4a4a4a)'
		: 'linear-gradient(to right, lab(100 0 0), lab(78 6.05 79.14), lab(76 -0.66 -1.58))';

	return (
		<div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
			<div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center shadow-lg shadow-green-500/20">
				<div className="h-4 w-4 rounded-full bg-white/20" />
			</div>
			<span
				className="bg-clip-text text-transparent"
				style={{
					backgroundImage: gradientStyle
				}}
			>
				INFINITY
			</span>
		</div>
	);
}
