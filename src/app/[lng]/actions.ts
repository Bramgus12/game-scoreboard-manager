"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { apiRoutes } from "@/utils/api/useAPI";

export async function signOutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
}

export async function getScoreboards() {
    const {
        scoreboard: { get },
    } = apiRoutes;

    return get();
}

export async function getUser() {
    const {
        user: { get },
    } = apiRoutes;

    return get();
}
