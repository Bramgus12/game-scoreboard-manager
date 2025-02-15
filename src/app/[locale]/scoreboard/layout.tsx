import { ReactNode } from "react";
import { Stack } from "@mui/material";
import Header from "@/pageComponents/root/header";
import PaddingBox from "@/pageComponents/root/PaddingBox";
import { getTranslations } from "next-intl/server";
import { Language } from "@/i18n/interfaces";

export default async function ScoreboardLayout(props: {
    children: ReactNode;
    params: Promise<{ locale: Language }>;
}) {
    const { children, params } = props;

    const { locale } = await params;

    await getTranslations({ locale });

    return (
        <Stack>
            <Header />
            <PaddingBox>{children}</PaddingBox>
        </Stack>
    );
}
