"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { UUID } from "crypto";
import RoundDialog from "./round-dialog";
import useKlaverjasTeamsQuery from "@/queries/use-klaverjas-teams-query";

type Props = {
    scoreboardId: UUID;
};

export default function CreateRoundButton(props: Props) {
    const { scoreboardId } = props;

    const t = useTranslations("klaverjas.createRoundDialog");

    const { data: teams, isPending, isError } = useKlaverjasTeamsQuery(scoreboardId);

    const [open, setOpen] = useState(false);

    if (isPending) {
        return (
            <Button variant="default" disabled>
                {t("loadingButton")}
            </Button>
        );
    }

    if (isError || !teams) {
        return null;
    }

    return (
        <>
            <Button variant="default" onClick={() => setOpen(true)}>
                {t("newRound")}
            </Button>
            <RoundDialog
                scoreboardId={scoreboardId}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
}
