import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonGroupVariants = cva("inline-flex w-fit items-center", {
    variants: {
        orientation: {
            horizontal:
                "flex-row [&>[data-slot=button]]:shadow-none [&>[data-slot=button]]:focus-visible:z-10 [&>:not([data-slot=button-group]):not(:first-child)]:-ml-px [&>:not([data-slot=button-group]):not(:first-child)]:rounded-l-none [&>:not([data-slot=button-group]):not(:last-child)]:rounded-r-none",
            vertical:
                "flex-col [&>[data-slot=button]]:shadow-none [&>[data-slot=button]]:focus-visible:z-10 [&>:not([data-slot=button-group]):not(:first-child)]:-mt-px [&>:not([data-slot=button-group]):not(:first-child)]:rounded-t-none [&>:not([data-slot=button-group]):not(:last-child)]:rounded-b-none",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});

function ButtonGroup({
    className,
    orientation,
    ...props
}: React.ComponentProps<"div"> &
    VariantProps<typeof buttonGroupVariants>) {
    return (
        <div
            data-slot="button-group"
            role="group"
            data-orientation={orientation}
            className={cn(buttonGroupVariants({ orientation }), className)}
            {...props}
        />
    );
}

function ButtonGroupSeparator({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<"div"> & {
    orientation?: "horizontal" | "vertical";
}) {
    return (
        <div
            data-slot="button-group-separator"
            role="separator"
            data-orientation={orientation}
            className={cn(
                "bg-border",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className,
            )}
            {...props}
        />
    );
}

function ButtonGroupText({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"span"> & {
    asChild?: boolean;
}) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            data-slot="button-group-text"
            className={cn(
                "bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-md px-3 text-sm",
                className,
            )}
            {...props}
        />
    );
}

export {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
    buttonGroupVariants,
};
