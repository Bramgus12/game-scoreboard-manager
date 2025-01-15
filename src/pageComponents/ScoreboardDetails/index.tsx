"use client";

import { AppGameType } from "@/models/app/scoreboard/GameType";
import CreateKlaverjasGame from "@/pageComponents/createKlaverjasGame";
import { Language } from "@/app/i18n/settings";
import CreateBoerenbridgeGame from "@/pageComponents/createBoerenbridgeGame";

type Props = {
    gameType: AppGameType;
    lng: Language;
};

export default function ScoreboardDetails(props: Props) {
    const { gameType, lng } = props;

    switch (gameType) {
        case "boerenbridge":
            return <CreateBoerenbridgeGame lng={lng} />;
        case "klaverjas":
            return <CreateKlaverjasGame lng={lng} />;
    }
}
