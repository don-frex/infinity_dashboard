import React from 'react';

export function Logo({ className }: { className?: string }) {
	return (
		<div className={`flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
			<div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center shadow-lg shadow-green-500/20">
				<div className="h-4 w-4 rounded-full bg-white/20" />
			</div>
			<span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">INFINITY</span>
		</div>
	);
}
