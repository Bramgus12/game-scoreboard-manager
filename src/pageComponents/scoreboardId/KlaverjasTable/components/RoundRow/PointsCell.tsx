import { Stack, Tooltip } from "@mui/material";
import { StarRounded, WaterDropRounded } from "@mui/icons-material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import { getFame } from "@/utils/funcs/getFame";

export default function PointsCell(props: {
    round: MergedRound;
    team: "team1" | "team2";
}) {
    const { round, team } = props;

    const fame = getFame(round, team);

    return (
        <Stack direction="row" justifyContent="end" alignItems="center" gap={1}>
            {round[team].isPit ? (
                <Tooltip title="Pit">
                    <StarRounded sx={{ width: 16, height: 16 }} />
                </Tooltip>
            ) : null}
            {round[team].isWet ? (
                <Tooltip title="Wet">
                    <WaterDropRounded sx={{ width: 16, height: 16 }} />
                </Tooltip>
            ) : null}
            {round[team].points}
            {fame > 0 ? ` + ${fame}` : null}
        </Stack>
    );
}
