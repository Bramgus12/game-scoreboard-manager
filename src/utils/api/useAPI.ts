import { ApiRoutes } from "./interfaces";
import { genericRequest } from "./fetcherFuncs";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function useAPI(accessKey: string): ApiRoutes {
    return {
        user: {
            get: () =>
                genericRequest(undefined, `${baseUrl}/user`, "get", {
                    Authorization: `Bearer ${accessKey}`,
                }),
            post: (user) =>
                genericRequest(user, `${baseUrl}/user`, "post", {
                    Authorization: `Bearer ${accessKey}`,
                }),
            put: (user) =>
                genericRequest(user, `${baseUrl}/user`, "put", {
                    Authorization: `Bearer ${accessKey}`,
                }),
        },
    };
}
