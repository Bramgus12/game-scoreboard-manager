import { Box, CircularProgress } from "@mui/material";
import { AuthSessionMissingError } from "@supabase/supabase-js";
import { RouterProvider } from "react-router-dom";
import useUserLogoutMutation from "utils/auth/mutators/useUserLogoutMutation";
import useAuthUserQuery from "utils/auth/queries/useAuthUserQuery";
import createRouter from "utils/router/createRouter";

export default function Router() {
    const { data, isPending, isError, error } = useAuthUserQuery();

    const mutation = useUserLogoutMutation();

    if (isPending) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 5px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError && !(error instanceof AuthSessionMissingError)) {
        return <div>Error</div>;
    }

    const router = createRouter(mutation.mutateAsync, data);

    return <RouterProvider router={router} />;
}
