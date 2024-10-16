import {
    FormControlLabel,
    Grid2,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { TEAM_TYPE } from "constants/teamType";
import { Control, Controller } from "react-hook-form";
import { NewRoundForm } from "pages/app.scoreboard.$scoreboardId/components/NewRoundDialog/index";
import { useTranslation } from "react-i18next";

function StepOne(props: { control: Control<NewRoundForm> }) {
    const { control } = props;

    const { t } = useTranslation("scoreboardCurrentPage");

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
