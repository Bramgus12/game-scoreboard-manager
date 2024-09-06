import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "utils/auth/useAuth";

export default function RootPage() {
    useAuth();

    return (
        <Box sx={{ height: "100vh" }}>
            <Stack>
                <Header />
                <Outlet />
            </Stack>
        </Box>
    );
}
