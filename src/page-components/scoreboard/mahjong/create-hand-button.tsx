"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MahjongHandDialog from "@/page-components/scoreboard/mahjong/hand-dialog";
import { UUID } from "crypto";
import { useTranslations } from "next-intl";

type Props = {
    scoreboardId: UUID;
    disabled: boolean;
};

export default function CreateMahjongHandButton(props: Props) {
    const { scoreboardId, disabled } = props;
    const t = useTranslations("mahjong.handDialog");
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} disabled={disabled}>
                <Plus />
                {t("newHand")}
            </Button>
            <MahjongHandDialog
                open={open}
                scoreboardId={scoreboardId}
                onOpenChange={setOpen}
            />
        </>
    );
}
