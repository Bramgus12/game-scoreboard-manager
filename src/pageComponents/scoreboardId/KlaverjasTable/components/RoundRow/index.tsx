import { TableCell, TableRow } from "@mui/material";
import { MergedRound } from "@/pageComponents/scoreboardId/KlaverjasTable/interfaces";
import PointsCell from "@/pageComponents/scoreboardId/KlaverjasTable/components/RoundRow/PointsCell";
import RoundMenu from "@/pageComponents/scoreboardId/KlaverjasTable/components/RoundRow/Menu";
import { UUID } from "crypto";
import { Language } from "@/app/i18n/settings";

export default function RoundRow(props: {
    scoreboardId: UUID;
    round: MergedRound;
    isLastRound: boolean;
    lng: Language;
}) {
    const { round, isLastRound, scoreboardId, lng } = props;

    return (
        <TableRow key={round.roundNumber}>
            <TableCell align="right" variant="body" sx={{ width: 10, padding: 1 }}>
                {round.roundNumber}
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                <PointsCell round={round} team="team1" />
            </TableCell>
            <TableCell variant="body" sx={{ width: 0.5, padding: 1 }} align="right">
                <PointsCell round={round} team="team2" />
            </TableCell>
            <TableCell sx={{ padding: 1 }}>
                <RoundMenu
                    lng={lng}
                    isLastRound={isLastRound}
                    round={round}
                    scoreboardId={scoreboardId}
                />
            </TableCell>
        </TableRow>
    );
}
