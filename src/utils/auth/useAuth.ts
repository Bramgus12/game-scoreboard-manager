import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { redirect } from "react-router-dom";

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export function useAuth() {
    function handleSignedInEvent() {
        if (window.location.pathname.startsWith("/auth")) {
            redirect("/");
        }
    }

    function handleSignedOutEvent() {
        if (!window.location.pathname.startsWith("/auth")) {
            redirect("/auth/login");
        }
    }

    const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
            handleSignedInEvent();
        } else if (event === "SIGNED_OUT") {
            handleSignedOutEvent();
        } else if (event === "PASSWORD_RECOVERY") {
            // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
            // handle token refreshed event
        } else if (event === "USER_UPDATED") {
            // handle user updated event
        }
    });

    useEffect(() => {
        return data.subscription.unsubscribe;
    }, [data.subscription.unsubscribe]);
}
