import { useUserQuery } from "../../../../utils/api/queries/useUserQuery";

export default function HomePage() {
    const { data, isPending, isError } = useUserQuery();

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            Welcome {data?.firstName} {data?.lastName}
        </div>
    );
}
