import { Grid2, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import FameInput from "@/pageComponents/round/components/StepTwo/components/FameInput";
import { NewRoundForm } from "@/pageComponents/round";
import { useTranslations } from "next-intl";

export default function StepTwo(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    const t = useTranslations("scoreboardCurrentPage");

    return (
        <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={12}>
                <Typography variant="h5">
                    {t("roundDialog.step2.keepTrack")}
                </Typography>
            </Grid2>
            <Grid2
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
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
            <Grid2
                size={{
                    xs: 12,
                    md: 6,
                }}
            >
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
