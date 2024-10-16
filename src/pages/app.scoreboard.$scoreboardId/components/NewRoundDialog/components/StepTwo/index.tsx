import { Grid2, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { NewRoundForm } from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/index";
import FameInput from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/components/StepTwo/components/FameInput";
import { useTranslation } from "react-i18next";

export default function StepTwo(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Typography variant="h5">
                    {t("roundDialog.step2.keepTrack")}
                </Typography>
            </Grid2>
            <Grid2 size={6}>
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput
                            field={renderProps.field}
                            label={t("roundDialog.us")}
                        />
                    )}
                    control={control}
                    name="usFame"
                />
            </Grid2>
            <Grid2 size={6}>
                <Controller
                    defaultValue={0}
                    render={(renderProps) => (
                        <FameInput
                            field={renderProps.field}
                            label={t("roundDialog.them")}
                        />
                    )}
                    control={control}
                    name="themFame"
                />
            </Grid2>
        </Grid2>
    );
}
