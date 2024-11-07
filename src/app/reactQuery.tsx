"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function ReactQuery(props: { children: ReactNode }) {
    const { children } = props;

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
