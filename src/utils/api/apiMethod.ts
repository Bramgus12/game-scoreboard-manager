import { ObjectValues } from "@/utils/objectValues";

export const API_METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
} as const;

export type ApiMethod = ObjectValues<typeof API_METHOD>;
