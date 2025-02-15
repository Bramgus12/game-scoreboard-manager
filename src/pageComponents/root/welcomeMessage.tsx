import { Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { currentUser } from "@clerk/nextjs/server";

export default async function WelcomeMessage() {
    const t = await getTranslations("scoreboardHomePage");

    const user = await currentUser();

    if (user == null) {
        throw new Error("User not found");
    }

    return (
        <Typography variant="h4">
            {t("welcomeMessage", {
                firstName: user.firstName,
                lastName: user.lastName,
            })}
        </Typography>
    );
}
