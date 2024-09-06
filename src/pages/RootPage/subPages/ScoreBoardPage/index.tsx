import { useParams } from "react-router-dom";
import CreateScoreBoard from "./components/CreateScoreBoard";
import { Box } from "@mui/material";
import CurrentGame from "./components/CurrentGame";

export default function ScoreBoardPage() {
    const { id } = useParams();

    const isEditing = id != null;

    return (
        <Box sx={{ padding: (theme) => theme.spacing(5, 10) }}>
            {isEditing ? <CurrentGame /> : <CreateScoreBoard />}
        </Box>
    );
}
