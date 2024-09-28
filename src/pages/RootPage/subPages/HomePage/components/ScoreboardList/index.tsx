import useScoreboardsQuery from "utils/api/queries/useScoreboardsQuery";
import ScoreboardItem from "./ScoreboardItem";
import { Skeleton, Stack } from "@mui/material";

export default function ScoreboardList() {
    const { data, isPending, isError } = useScoreboardsQuery();

    if (isPending) {
        return Array.from({ length: 10 }, (_, i) => {
            return (
                <Skeleton
                    key={i}
                    variant="rounded"
                    height={105}
                    sx={{ borderRadius: 4 }}
                />
            );
        });
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Stack spacing={2}>
            {data
                .sort(
                    (scoreboard1, scoreboard2) =>
                        scoreboard2.createdAt.valueOf() -
                        scoreboard1.createdAt.valueOf(),
                )
                .map((scoreboard) => {
                    return (
                        <ScoreboardItem
                            scoreboard={scoreboard}
                            key={scoreboard.id}
                            linkTo={`/scoreboard/${scoreboard.id}`}
                        />
                    );
                })}
        </Stack>
    );
}
