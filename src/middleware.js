import { NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";
    const isResetPasswordPath = path === "/forgotpassword" || path === "/resetpassword";

    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token || isResetPasswordPath && token){
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    if(!isPublicPath && !isResetPasswordPath && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/",
        "/dashboard",
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/verifyemail",
        "/forgotpassword",
        "/resetpassword"
    ]
}