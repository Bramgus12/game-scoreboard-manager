import Register from "@/pageComponents/auth/register";
import { Language } from "@/app/i18n/settings";

export default async function RegisterPage(props: {
    params: Promise<{ lng: Language }>;
}) {
    const { params } = props;

    const { lng } = await params;

    return <Register lng={lng} />;
}
