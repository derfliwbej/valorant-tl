import { NextResponse } from "next/server";
import jwtDecode, { InvalidTokenError } from "jwt-decode";

const verifyTokens = async (access_token, entitlements_token, puuid) => {
    const res = await fetch(`https://pd.ap.a.pvp.net/account-xp/v1/players/${puuid}`, {
        headers: {
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-09.06-shipping-10-2832364',    
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
    
    if(pathname.startsWith('/store') || pathname.startsWith('/penalties')) {
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