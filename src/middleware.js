import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

const verifyTokens = async (access_token, entitlements_token, puuid) => {
    const res = await fetch(`https://pd.ap.a.pvp.net/account-xp/v1/players/${puuid}`, {
        headers: {
            'X-Riot-Entitlements-JWT': entitlements_token,
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (res.status >= 400 && res.status < 500) {
        return false;
    }

    return true;
}

export async function middleware(request) {
    const { value: access_token } = request.cookies.get('access_token');
    const { value: entitlements_token } = request.cookies.get('entitlements_token');
    const pathname = request.nextUrl.pathname;

    const { sub: puuid } = jwtDecode(access_token);

    if (pathname === '/') {
        const url = new URL(request.url);
        url.pathname = '/store';
        if(await verifyTokens(access_token, entitlements_token, puuid)) return NextResponse.redirect(url);
    } else if(pathname.startsWith('/store')) {
        const url = new URL(request.url);
        url.pathname = '/';

        if ((!access_token || !entitlements_token)
            || (!await verifyTokens(access_token, entitlements_token, puuid))) 
            return NextResponse.redirect(url);
    }

    return NextResponse.next();
}