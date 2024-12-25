import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    const privateRoute = "/user/watchLater";
    const authRoutes = ["/user/login", "/user/register"];
    console.log(privateRoute)
    console.log(token)
    console.log(pathname)

    // restriction for public route
    if (pathname.startsWith(privateRoute)) {
        if (!token) {
            console.log("invalid token")
            const loginUrl = new URL("/user/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(new URL(loginUrl, request.url))
        }
        return NextResponse.next(); 
    }

    // redirect for loggedin user 
    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user/watchLater",
        "/user/login",     
        "/user/register",  
        "/",                
    ],
};