// Without a defined matcher, this one-line applies next-auth to the entire application.
// export {default} from "next-auth/middleware";

import { withAuth } from 'next-auth/middleware';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(

    function middleware(request: NextRequestWithAuth) {
        // `withAuth` augments the `Request` with the user's token.
        console.log("Middleware Pathname: ", request.nextUrl.pathname);
        console.log("Middleware Token", request.nextauth.token);

        if(request.nextUrl.pathname.startsWith("/admin") && request.nextauth.token?.role !== "ADMIN" && request.nextauth.token?.role !== "GERENTE") {
            return NextResponse.rewrite(new URL("/denied",request.url));
        }

        if(request.nextUrl.pathname.startsWith("/employees") && request.nextauth.token?.role !== "EMPLEADO") {
            return NextResponse.rewrite(new URL("/denied",request.url));
        }
        
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token //unless this function returns true, the middleware function will not execute. This applies to everything we have inside the matcher
        },
    }
);

// Applies next-auth only to matching routes - can be regex.
// export const config = { matcher: ["/admin/:path*"] }; // :path* is a dynamic segment that matches any subpath, similar to a regex .*.