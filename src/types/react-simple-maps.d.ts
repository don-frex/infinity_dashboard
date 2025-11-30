declare module 'react-simple-maps' {
	import * as React from 'react';

	export interface ComposableMapProps {
		projection?: string | ((width: number, height: number) => any);
		projectionConfig?: any;
		width?: number;
		height?: number;
		style?: any;
		children?: React.ReactNode;
	}

	export const ComposableMap: React.FC<ComposableMapProps>;

	export interface GeographiesProps {
		geography?: string | Record<string, any> | string[];
		children?: (args: { geographies: any[] }) => React.ReactNode;
		parseGeographies?: (geographies: any[]) => any[];
	}

	export const Geographies: React.FC<GeographiesProps>;

	export interface GeographyProps {
		geography?: any;
		fill?: string;
		stroke?: string;
		strokeWidth?: number;
		style?: any;
		onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
		onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
		onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
		onMouseDown?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
		onMouseUp?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
		onFocus?: (event: React.FocusEvent<SVGPathElement>) => void;
		onBlur?: (event: React.FocusEvent<SVGPathElement>) => void;
		key?: string | number;
	}

	export const Geography: React.FC<GeographyProps>;

	export interface MarkerProps {
		coordinates?: [number, number];
		children?: React.ReactNode;
		style?: any;
		onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
		onMouseEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
		onMouseLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
		onMouseDown?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
		onMouseUp?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
		onFocus?: (event: React.FocusEvent<SVGGElement>) => void;
		onBlur?: (event: React.FocusEvent<SVGGElement>) => void;
		key?: string | number;
	}

	export const Marker: React.FC<MarkerProps>;
}
