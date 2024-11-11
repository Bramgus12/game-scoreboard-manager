import Login from "@/pageComponents/auth/login";
import { Language } from "@/app/i18n/settings";

export default async function LoginPage(props: {
    params: Promise<{ lng: Language }>;
}) {
    const { params } = props;

    const { lng } = await params;

    return <Login lng={lng} />;
}
