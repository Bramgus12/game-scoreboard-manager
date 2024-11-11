"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RegisterForm } from "@/pageComponents/auth/register";
import { apiRoutes } from "@/utils/api/useAPI";

export async function registerUser(registerData: RegisterForm) {
    const supabase = await createClient();

    const {
        user: { post },
    } = apiRoutes;

    const { error } = await supabase.auth.signUp({
        password: registerData.password,
        email: registerData.email,
    });

    if (error) {
        redirect("/error");
    }

    await post({
        firstName: registerData.firstName,
        lastName: registerData.lastName,
    });

    revalidatePath("/", "layout");
    redirect("/");
}
