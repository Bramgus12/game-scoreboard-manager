import { ApiRoutes } from "./interfaces";
import { genericRequest } from "./fetcherFuncs";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function useAPI(): ApiRoutes {
    return {
        user: {
            get: () => genericRequest(undefined, `${baseUrl}/user`, "get"),
            post: (user) => genericRequest(user, `${baseUrl}/user`, "post"),
            put: (user) => genericRequest(user, `${baseUrl}/user`, "put"),
        },
    };
}
