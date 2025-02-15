import { UUID } from "crypto";
import BoerenbridgeGameTable from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable";

type Props = {
    id: UUID;
};

export default function BoerenbridgeGame(props: Props) {
    const { id } = props;

    return <BoerenbridgeGameTable scoreboardId={id} />;
}
