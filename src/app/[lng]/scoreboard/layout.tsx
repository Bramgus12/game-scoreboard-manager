import { ReactNode } from "react";
import { Stack } from "@mui/material";
import Header from "@/pageComponents/root/header";
import { Language } from "@/app/i18n/settings";
import PaddingBox from "@/pageComponents/root/PaddingBox";

export default async function ScoreboardLayout(props: {
    children: ReactNode;
    params: Promise<{ lng: Language }>;
}) {
    const { children, params } = props;

    const { lng } = await params;

    return (
        <Stack>
            <Header lng={lng} />
            <PaddingBox>{children}</PaddingBox>
        </Stack>
    );
}
