import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    cookies().set('access_token', '');
    cookies().set('entitlements_token', '');

    return NextResponse.json({ message: "Successfully logged out"});
}