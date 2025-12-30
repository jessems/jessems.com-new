import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import excludedRoutes from './scripts/excludedRoutes.json';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the current path matches any excluded route
	const isExcluded = excludedRoutes.some((excludedPath) =>
		pathname.startsWith(`/posts${excludedPath}`)
	);

	if (isExcluded) {
		// Return 404 for excluded routes
		return new NextResponse(null, { status: 404 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/posts/:path*'
};
