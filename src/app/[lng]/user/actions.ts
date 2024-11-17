"use server";

import { apiRoutes } from "@/utils/api/useAPI";
import { AppCreateUpdateUser } from "@/models/app/user/CreateUpdateUser";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
    const {
        user: { get },
    } = apiRoutes;

    return get();
}

export async function updateUser(user: AppCreateUpdateUser) {
    const {
        user: { put },
    } = apiRoutes;

    return put(user);
}

export async function enrollMfa(name: string) {
    const supabase = await createClient();

    return supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: name });
}

export async function challengeMfa(factorId: string) {
    const supabase = await createClient();

    return supabase.auth.mfa.challenge({ factorId });
}

export async function verifyMfa(
    factorId: string,
    challengeId: string,
    code: string,
) {
    const supabase = await createClient();

    return supabase.auth.mfa.verify({ factorId, challengeId, code });
}

export async function getAllMfaFactors() {
    const supabase = await createClient();

    return supabase.auth.mfa.listFactors();
}

export async function removeMfa(factorId: string) {
    const supabase = await createClient();

    return supabase.auth.mfa.unenroll({ factorId });
}
