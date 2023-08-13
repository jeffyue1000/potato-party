import { NextResponse } from "next/server";;
import jwt from "jsonwebtoken"

export function middleware(request){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/";
    const isResetPasswordPath = path === "/forgotpassword" || path === "/resetpassword";

    const userToken = request.cookies.get("userInfo")?.value || "";

    if(isPublicPath && userToken || isResetPasswordPath && userToken){
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    if(!isPublicPath && !isResetPasswordPath && !userToken){
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
        "/resetpassword",
        "/createroom",
        "/joinroom/:path*"
    ]
}