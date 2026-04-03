"use client";

import { useState } from "react";
import { UUID } from "crypto";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import useBoerenbridgePlayersQuery from "@/queries/use-boerenbridge-players-query";
import useBoerenbridgeRoundNumberQuery from "@/queries/use-boerenbridge-round-number-query";
import BoerenbridgeRoundDialog from "@/page-components/scoreboard/boerenbridge/round-dialog";

type Props = {
    scoreboardId: UUID;
};

export default function CreateBoerenbridgeRoundButton(props: Props) {
    const { scoreboardId } = props;

    const t = useTranslations("boerenbridge.roundDialog");
    const {
        data: players,
        isPending: isPlayersPending,
        isError: isPlayersError,
    } = useBoerenbridgePlayersQuery(scoreboardId);
    const {
        data: roundState,
        isPending: isRoundNumberPending,
        isError: isRoundNumberError,
    } = useBoerenbridgeRoundNumberQuery(scoreboardId);

    const [open, setOpen] = useState(false);

    if (isPlayersPending || isRoundNumberPending) {
        return (
            <Button variant="default" disabled>
                {t("loadingButton")}
            </Button>
        );
    }

    if (isPlayersError || isRoundNumberError || !players || roundState == null) {
        return null;
    }

    const roundNumber =
        typeof roundState.roundNumber === "number" &&
        Number.isFinite(roundState.roundNumber) &&
        roundState.roundNumber > 0
            ? roundState.roundNumber
            : 1;
    const isFinished = roundState.isFinished === true;

    if (isFinished) {
        return null;
    }

    return (
        <>
            <Button variant="default" onClick={() => setOpen(true)}>
                <Plus />
                {t("newRound")}
            </Button>
            <BoerenbridgeRoundDialog
                open={open}
                scoreboardId={scoreboardId}
                players={players}
                roundNumber={roundNumber}
                onOpenChange={setOpen}
            />
        </>
    );
}
