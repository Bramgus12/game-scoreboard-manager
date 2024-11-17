import MfaVerify from "@/pageComponents/auth/mfaVerify";
import { Language } from "@/app/i18n/settings";

export default async function MfaPage(props: {
    params: Promise<{ lng: Language }>;
}) {
    const { params } = props;

    const { lng } = await params;

    return <MfaVerify lng={lng} />;
}
