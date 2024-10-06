import { NextResponse } from "next/server";

export async function GET(request) {
    const access_token = request.cookies.get('access_token')?.value;
    const entitlements_token = request.cookies.get('entitlements_token')?.value;

    const puuidRes = await fetch('https://auth.riotgames.com/userinfo', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    if(puuidRes.status >= 400 && puuidRes.status < 500) {
        return NextResponse.json({ message: "Invalid access token" }, { status: puuidRes.status });
    } else if (puuidRes.status >= 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: puuidRes.status });
    }

    const { sub: puuid } = await puuidRes.json();

    const nameRes = await fetch('https://pd.ap.a.pvp.net/name-service/v2/players', {
        method: 'PUT',
        headers: {
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-09.06-shipping-10-2832364',
            'X-Riot-Entitlements-JWT': entitlements_token,
            'Authorization': `Bearer ${access_token}`
        },
        body: `["${puuid}"]`
    });

    if (nameRes.status >= 400 && nameRes.status < 500) {
        return NextResponse.json({ message: "Invalid tokens" }, { status: nameRes.status });
    } else if (nameRes.status >= 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: nameRes.status });
    }

    const nameBody = await nameRes.json();
    const { GameName: game_name, TagLine: tag_line } = nameBody[0];

    const cardRes = await fetch(`https://pd.ap.a.pvp.net/personalization/v2/players/${puuid}/playerloadout`, {
        headers: {
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'X-Riot-ClientVersion': 'release-09.06-shipping-10-2832364',
            'X-Riot-Entitlements-JWT': entitlements_token,
            'Authorization': `Bearer ${access_token}`
        }
    });

    if (cardRes.status >= 400 && cardRes.status < 500) {
        return NextResponse.json({ message: "Invalid tokens" }, { status: cardRes.status });
    } else if (nameRes.status >= 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: cardRes.status });
    }

    const cardBody = await cardRes.json();
    const { PlayerCardID: card_id } = cardBody['Identity'];
    
    const user = { puuid, game_name, tag_line, card_id };

    return NextResponse.json(user);
}