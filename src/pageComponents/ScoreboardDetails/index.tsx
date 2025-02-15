"use client";

import { AppGameType } from "@/models/app/scoreboard/GameType";
import CreateKlaverjasGame from "@/pageComponents/createKlaverjasGame";
import CreateBoerenbridgeGame from "@/pageComponents/createBoerenbridgeGame";

type Props = {
    gameType: AppGameType;
};

export default function ScoreboardDetails(props: Props) {
    const { gameType } = props;

    switch (gameType) {
        case "boerenbridge":
            return <CreateBoerenbridgeGame />;
        case "klaverjas":
            return <CreateKlaverjasGame />;
    }
}
