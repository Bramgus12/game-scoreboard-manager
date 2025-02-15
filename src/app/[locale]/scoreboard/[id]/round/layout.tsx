import { ReactNode } from "react";
import { Paper } from "@mui/material";

export default function RoundLayout({ children }: { children: ReactNode }) {
    return <Paper>{children}</Paper>;
}
