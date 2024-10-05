import { createFileRoute } from "@tanstack/react-router";
import CreateScoreBoard from "pages/app.scoreboard";

export const Route = createFileRoute("/app/scoreboard/")({
    component: ScoreBoardPage,
});

function ScoreBoardPage() {
    return <CreateScoreBoard />;
}
