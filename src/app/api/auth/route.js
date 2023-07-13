import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    const { access_token } = await request.json();

    if(!access_token) {
        return NextResponse.json({ message: "Access token not found" }, { status: 400 });
    }

    const res = await fetch('https://entitlements.auth.riotgames.com/api/token/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'RiotClient/63.0.9.4909983.4789131 rso-authenticator (Windows;10;;Professional, x64)',
            'Authorization': `Bearer ${access_token}`
        }
    });

    if(res.status === 401) {
        return NextResponse.json({ message: "Invalid access token" }, { status: res.status });
    } else if (res.status >= 500) {
        return NextResponse.json({ message: "Server error while authorizing" }, { status: 500 });
    }

    const { entitlements_token } = await res.json();

    cookies().set('access_token', access_token);
    cookies().set('entitlements_token', entitlements_token);

    return NextResponse.json({ message: "Successfully authorized!" });
}