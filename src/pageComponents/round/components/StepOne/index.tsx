import {
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { TEAM_TYPE } from "@/constants/teamType";
import { NewRoundForm } from "@/pageComponents/round";
import { Language } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n/client";

function StepOne(props: { control: Control<NewRoundForm>; lng: Language }) {
    const { control, lng } = props;

    const { t } = useTranslation(lng, "scoreboardCurrentPage");

    return (
        <Controller
            render={(controllerProps) => (
                <RadioGroup
                    onChange={controllerProps.field.onChange}
                    onBlur={controllerProps.field.onBlur}
                    name={controllerProps.field.name}
                    ref={controllerProps.field.ref}
                    value={controllerProps.field.value}
                >
                    <Grid2 container direction="column" spacing={2}>
                        <Grid2>
                            <Typography variant="h6">
                                {t("roundDialog.step1.selectGoingTeam")}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <FormControlLabel
                                value={TEAM_TYPE.US}
                                control={<Radio />}
                                label={t("roundDialog.us")}
                            />
                        </Grid2>
                        <Grid2>
                            <FormControlLabel
                                value={TEAM_TYPE.THEM}
                                control={<Radio />}
                                label={t("roundDialog.them")}
                            />
                        </Grid2>
                    </Grid2>
                </RadioGroup>
            )}
            defaultValue={null}
            name="goingTeam"
            control={control}
        />
    );
}

export default StepOne;
