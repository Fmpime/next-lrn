import {NextRequest, NextResponse} from "next/server";
import {EnumTokens} from "@/services/auth-token.service";
import {redirect} from "next/navigation";
import {DASHBOARD_PAGES} from "@/config/pages-url.config";

export async function middleware(
    request: NextRequest,
    response: NextResponse
) {
    const {url, cookies} = request
    const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
    const isAuthPages = url.includes('/auth')
    if (isAuthPages && refreshToken){
        return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME,url))
    }
    if (isAuthPages){
        return NextResponse.next()
    }
    if  (!refreshToken){
        return NextResponse.redirect(new URL('/auth',request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/i/:path*', '/auth/:path']
}