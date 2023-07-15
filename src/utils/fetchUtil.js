const ENV = process.env.NODE_ENV;

export default async function fetchUtil(route, options) {
    let baseUrl;
    if (ENV === "development") baseUrl = process.env.NEXT_PUBLIC_DEV_API;
    else if (ENV === "production") baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_API;

    const res = await fetch(`${baseUrl}${route}`, options || {});

    return res;
}