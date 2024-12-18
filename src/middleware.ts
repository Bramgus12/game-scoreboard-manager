import { type NextRequest, NextResponse } from "next/server";
import { cookieName, fallbackLng, Language, languages } from "@/app/i18n/settings";
import acceptLanguage from "accept-language";
import { createServerClient } from "@supabase/ssr";

acceptLanguage.languages([...languages]);

export async function middleware(request: NextRequest) {
    // Language detection logic
    let lng: Language | undefined | null;
    if (languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`))) {
        lng = languages.find((loc) =>
            request.nextUrl.pathname.startsWith(`/${loc}`),
        );
    }
    if (lng == null) {
        lng = acceptLanguage.get(request.cookies.get(cookieName)?.value) as Language;
    }
    if (lng == null) {
        lng = acceptLanguage.get(request.headers.get("Accept-Language")) as Language;
    }
    if (lng == null) {
        lng = fallbackLng;
    }

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !request.nextUrl.pathname.startsWith("/_next")
    ) {
        return NextResponse.redirect(
            new URL(
                `/${lng}${request.nextUrl.pathname !== "/" ? request.nextUrl.pathname : ""}`,
                request.url,
            ),
        );
    }

    // Supabase authentication logic
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => {
                    return request.cookies.getAll();
                },
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    // IMPORTANT: Avoid logic between createServerClient and supabase.auth.getUser()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const authAssuranceLevel =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    const isAuthRoute =
        request.nextUrl.pathname.startsWith(`/${lng}/login`) ||
        request.nextUrl.pathname.startsWith(`/${lng}/mfa`) ||
        request.nextUrl.pathname.startsWith(`/${lng}/register`);

    if (
        (authAssuranceLevel.data?.currentLevel == null ||
            authAssuranceLevel.data.currentLevel === "aal1") &&
        authAssuranceLevel.data?.nextLevel === "aal2" &&
        !request.nextUrl.pathname.startsWith(`/${lng}/mfa`)
    ) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lng}/mfa`;
        return NextResponse.redirect(url);
    }

    if (!user && !isAuthRoute) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lng}/login`;
        return NextResponse.redirect(url);
    }

    if (
        user &&
        (request.nextUrl.pathname.startsWith(`/${lng}/login`) ||
            request.nextUrl.pathname.startsWith(`/${lng}/register`))
    ) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lng}`;
        return NextResponse.redirect(url);
    }

    // Merge supabaseResponse cookies with language cookies
    const finalResponse = supabaseResponse;

    if (request.headers.has("referer")) {
        const refererUrl = new URL(request.headers.get("referer") ?? "");
        const lngInReferer = languages.find((l) =>
            refererUrl.pathname.startsWith(`/${l}`),
        );
        if (lngInReferer) {
            supabaseResponse.cookies.set(cookieName, lngInReferer);
        }
    }

    supabaseResponse.cookies.getAll().forEach(({ name, value }) => {
        finalResponse.cookies.set(name, value);
    });

    return finalResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
