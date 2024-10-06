import { NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

export async function GET(request) {
    const access_token = request.cookies.get('access_token')?.value;
    const entitlements_token = request.cookies.get('entitlements_token')?.value;

    const puuidRes = await fetch('https://auth.riotgames.com/userinfo', {
        headers: {
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-09.06-shipping-10-2832364',
            'Authorization': `Bearer ${access_token}`
        }
    });

    if(puuidRes.status >= 400 && puuidRes.status < 500) {
        return NextResponse.json({ message: "Invalid access token" }, { status: puuidRes.status });
    } else if (puuidRes.status >= 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: puuidRes.status });
    }

    const { sub: puuid } = await puuidRes.json();

    const storeRes = await fetch(`https://pd.ap.a.pvp.net/store/v3/storefront/${puuid}`, {
        method: 'POST',
        headers: {
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-09.06-shipping-10-2832364',
            'X-Riot-Entitlements-JWT': entitlements_token,
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({})
    });

    if(storeRes.status >= 400 && storeRes.status < 500) {
        return NextResponse.json({ message: "Invalid access token" }, { status: storeRes.status });
    } else if (storeRes.status >= 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: storeRes.status });
    }

    const storeBody = await storeRes.json();

    const offers = storeBody['SkinsPanelLayout']['SingleItemStoreOffers'];

    const items = await Promise.all(offers.map( async (offer) => {
        const res = await fetch(`https://valorant-api.com/v1/weapons/skinlevels/${offer['OfferID']}`);
        const { data: body } = await res.json();

        const name = body['displayName'];
        const displayIcon = body['displayIcon'];

        let item = {
            id: offer['OfferID'],
            cost: offer['Cost'][Object.keys(offer['Cost'])[0]],
            name,
            displayIcon
        };

        return item;
    }));
  
    return NextResponse.json({ items });
}