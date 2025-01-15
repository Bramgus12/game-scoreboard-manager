import { Language } from "@/app/i18n/settings";
import { UUID } from "crypto";
import BoerenbridgeGameTable from "@/pageComponents/boerenbridgeGame/boerenbridgeGameTable";

type Props = {
    id: UUID;
    lng: Language;
};

export default function BoerenbridgeGame(props: Props) {
    const { id, lng } = props;

    return <BoerenbridgeGameTable scoreboardId={id} lng={lng} />;
}
