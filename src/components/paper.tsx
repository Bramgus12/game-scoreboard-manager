import { ComponentProps } from "react";

type Props = ComponentProps<"div">;

export default function Paper(props: Props) {
    const { className, children, ...restProps } = props;

    return (
        <div
            className={`rounded-lg border border-gray-400 bg-gray-200 dark:border-gray-700 dark:bg-gray-900 ${className}`}
            {...restProps}
        >
            {children}
        </div>
    );
}
