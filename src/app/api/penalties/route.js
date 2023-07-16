import { NextResponse } from "next/server";

export async function GET(request) {
    const access_token = request.cookies.get('access_token')?.value;
    const entitlements_token = request.cookies.get('entitlements_token')?.value;
    const client_platform = 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9';

    const versionRes = await fetch('https://valorant-api.com/v1/version');

    if (versionRes.status >= 500) {
        return NextResponse.json({ message: "Error fetching client version" }, { status: versionRes.status });
    }

    const { data: versionBody } = await versionRes.json();
    const { riotClientVersion: client_version } = versionBody;

    const penaltiesRes = await fetch('https://pd.ap.a.pvp.net/restrictions/v3/penalties', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'X-Riot-Entitlements-JWT': entitlements_token,
            'X-Riot-ClientPlatform': client_platform,
            'X-Riot-ClientVersion': client_version
        }
    });

    if (penaltiesRes.status >= 400 && penaltiesRes.status < 500) {
        return NextResponse.json({ message: "Invalid access token" }, { status: penaltiesRes.status });
    } else if (penaltiesRes.status > 500) {
        return NextResponse.json({ message: "Error while connecting to riot server" }, { status: penaltiesRes.status });
    }

    const { Penalties: penalties } = await penaltiesRes.json();

    const penaltiesMapped = penalties.filter( penalty => {
        return penalty.QueueRestrictionEffect?.QueueIDs.length
    }).map( penalty => {
        return { expiry: penalty['Expiry'], queues: penalty.QueueRestrictionEffect?.QueueIDs };
    });

    return NextResponse.json({ penalties: penaltiesMapped });
}