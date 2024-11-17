import UserNameForm from "@/pageComponents/user/userNameForm";
import { getAllMfaFactors, getUser } from "@/app/[lng]/user/actions";
import { Paper, Stack, Typography } from "@mui/material";
import { Language } from "@/app/i18n/settings";
import { translation } from "@/app/i18n";
import Mfa from "@/pageComponents/user/mfa";

export default async function UserPage(props: {
    params: Promise<{ lng: Language }>;
}) {
    const { params } = props;

    const { lng } = await params;

    const user = await getUser();

    const mfaFactors = await getAllMfaFactors();

    const { t } = await translation(lng, "accountSettings");

    return (
        <Stack spacing={2}>
            <Typography variant="h4">{t("accountSettings")}</Typography>
            <Paper>
                <Stack spacing={3}>
                    <UserNameForm user={user} lng={lng} />
                    <Mfa lng={lng} mfaFactors={mfaFactors} />
                </Stack>
            </Paper>
        </Stack>
    );
}
