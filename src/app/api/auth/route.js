import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { access_token } = await request.json();
        const res = await fetch('https://entitlements.auth.riotgames.com/api/token/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'RiotClient/63.0.9.4909983.4789131 rso-authenticator (Windows;10;;Professional, x64)',
                'Authorization': `Bearer ${access_token}`
            }
        });

        const { entitlements_token } = await res.json();

        return NextResponse.json({ entitlements_token });
    } catch(err) {
        return new Response("Internal Server Error", { status: 500 });
    }
}