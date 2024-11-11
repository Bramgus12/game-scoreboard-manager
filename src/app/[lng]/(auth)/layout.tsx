import { ReactNode } from "react";
import { Language } from "@/app/i18n/settings";
import AuthLayout from "@/pageComponents/auth/authLayout";

export default async function Layout(props: {
    children: ReactNode;
    params: Promise<{ lng: Language }>;
}) {
    const { children, params } = props;

    const { lng } = await params;

    return <AuthLayout lng={lng}>{children}</AuthLayout>;
}
