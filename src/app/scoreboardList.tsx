"use client";
import ScoreboardItem from "@/app/scoreboardItem";
import { getScoreboards } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

export default function ScoreboardList() {
    const { data, isError, isPending } = useQuery({
        queryKey: ["scoreboards"],
        queryFn: getScoreboards,
    });

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

    return data
        .sort(
            (scoreboard1, scoreboard2) =>
                scoreboard2.createdAt.valueOf() - scoreboard1.createdAt.valueOf(),
        )
        .map((scoreboard) => {
            return <ScoreboardItem scoreboard={scoreboard} key={scoreboard.id} />;
        });
}
