import { Skeleton, Stack, Typography } from "@mui/material";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { useUserQuery } from "utils/api/queries/useUserQuery";
import { useTranslation } from "react-i18next";

export default function WelcomeMessage() {
    const { data, isPending, isError } = useUserQuery();

    const { t } = useTranslation("scoreboardHomePage");

    if (isPending) {
        return <Skeleton height={45} />;
    }

    if (isError) {
        return (
            <Stack direction="row" alignItems="center" spacing={2}>
                <ErrorOutlineRounded />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {t("error")}
                </Typography>
            </Stack>
        );
    }

    return (
        <Typography variant="h4">
            {t("welcomeMessage", {
                firstName: data?.firstName,
                lastName: data?.lastName,
            })}
        </Typography>
    );
}
