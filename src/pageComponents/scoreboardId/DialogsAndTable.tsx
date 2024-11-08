import { UUID } from "crypto";
import KlaverjasTable from "@/pageComponents/scoreboardId/KlaverjasTable";
import { Fab } from "@mui/material";
import { FiberNewRounded } from "@mui/icons-material";

export default function DialogsAndTable({ id }: { id: UUID }) {
    return (
        <>
            <KlaverjasTable id={id} />
            {/*<DeleteRoundDialog*/}
            {/*    open={deleteDialogState.isOpen}*/}
            {/*    onClose={() =>*/}
            {/*        setDeleteDialogState({ isOpen: false, mergedRound: undefined })*/}
            {/*    }*/}
            {/*    onSubmit={() => {*/}
            {/*        if (deleteDialogState.mergedRound != null) {*/}
            {/*            void deleteRoundMutation(*/}
            {/*                id,*/}
            {/*                deleteDialogState.mergedRound.team1.klaverjasTeam,*/}
            {/*                deleteDialogState.mergedRound.team1.id,*/}
            {/*            );*/}
            {/*            void deleteRoundMutation(*/}
            {/*                id,*/}
            {/*                deleteDialogState.mergedRound.team2.klaverjasTeam,*/}
            {/*                deleteDialogState.mergedRound.team2.id,*/}
            {/*            );*/}
            {/*        }*/}
            {/*        setDeleteDialogState({ isOpen: false, mergedRound: undefined });*/}
            {/*    }}*/}
            {/*/>*/}
            <Fab
                color="primary"
                variant="extended"
                sx={{ position: "fixed", bottom: 25, right: 25 }}
                // onClick={() => setIsNewRoundDialogOpen(true)}
            >
                <FiberNewRounded sx={{ marginRight: 1 }} />
                {"New Round"}
            </Fab>
        </>
    );
}
