import { Typography } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";
import { getUser } from "@/app/[lng]/actions";

export default async function WelcomeMessage(props: { lng: Language }) {
    const { lng } = props;

    const { t } = await translation(lng, "scoreboardHomePage");

    const user = await getUser();

    return (
        <Typography variant="h4">
            {t("welcomeMessage", {
                firstName: user.firstName,
                lastName: user.lastName,
            })}
        </Typography>
    );
}
