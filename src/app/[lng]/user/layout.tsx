import { ReactNode } from "react";
import { Language } from "@/app/i18n/settings";
import { Stack } from "@mui/material";
import Header from "@/pageComponents/root/header";
import PaddingBox from "@/pageComponents/root/PaddingBox";

export default async function UserLayout(props: {
    children: ReactNode;
    params: Promise<{ lng: Language }>;
}) {
    const { params, children } = props;

    const { lng } = await params;

    return (
        <Stack>
            <Header lng={lng} />
            <PaddingBox>{children}</PaddingBox>
        </Stack>
    );
}
