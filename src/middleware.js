import { NextResponse } from "next/server";
import jwtDecode, { InvalidTokenError } from "jwt-decode";

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
    const access_token = request.cookies.get('access_token')?.value;
    const entitlements_token = request.cookies.get('entitlements_token')?.value;
    const pathname = request.nextUrl.pathname;

    if (pathname === '/') {
        const url = new URL(request.url);
        url.pathname = '/store';

        try {
            const { sub: puuid } = jwtDecode(access_token);

            if(await verifyTokens(access_token, entitlements_token, puuid)) return NextResponse.redirect(url);
        } catch(e) {
            if(e instanceof InvalidTokenError) return NextResponse.next();   
        }
    } 
    
    if(pathname.startsWith('/store')) {
        const url = new URL(request.url);
        url.pathname = '/';

        try {
            const { sub: puuid } = jwtDecode(access_token);

            if ((!access_token || !entitlements_token) || (!await verifyTokens(access_token, entitlements_token, puuid))) 
                return NextResponse.redirect(url);
        } catch(e) {
            if(e instanceof InvalidTokenError) return NextResponse.redirect(url);
        }        
    }
    
    return NextResponse.next();
}