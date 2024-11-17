"use server";

import { createClient } from "@/utils/supabase/server";

export async function verifyMfa(verifyCode: string) {
    const supabase = await createClient();

    const factors = await supabase.auth.mfa.listFactors();
    if (factors.error) {
        throw factors.error;
    }

    console.log(factors.data);

    const totpFactor = factors.data.totp[0];

    if (totpFactor == null) {
        throw new Error("No TOTP factors found!");
    }

    const factorId = totpFactor.id;

    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error) {
        throw challenge.error;
    }

    const challengeId = challenge.data.id;

    const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
    });

    if (verify.error) {
        throw verify.error;
    }
}
