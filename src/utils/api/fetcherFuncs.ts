import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestOptions } from "./interfaces";
import { ApiMethod } from "./apiMethod";
import { supabase } from "../auth/useAuth";

async function axiosFetch<Response = void, Body = void>(
    requestOptions: RequestOptions<Body>,
): Promise<AxiosResponse<Response>> {
    const requestConfig: AxiosRequestConfig<Body> = {
        headers: { ...requestOptions.authHeader },
    };
    let response: AxiosResponse<Response>;
    switch (requestOptions.method) {
        case "get": {
            response = await axios.get<Response, AxiosResponse<Response>>(
                requestOptions.url,
                requestConfig,
            );
            break;
        }
        case "post": {
            response = await axios.post<Response, AxiosResponse<Response>, Body>(
                requestOptions.url,
                requestOptions.body,
                requestConfig,
            );
            break;
        }
        case "put": {
            response = await axios.put<Response, AxiosResponse<Response>, Body>(
                requestOptions.url,
                requestOptions.body,
                requestConfig,
            );
            break;
        }
        case "delete": {
            response = await axios.delete<Response, AxiosResponse<Response>>(
                requestOptions.url,
                requestConfig,
            );
            break;
        }
        default: {
            throw new Error("Method not implemented");
        }
    }
    return response;
}

export async function genericRequest<RequestType, ResponseType>(
    requestBody: RequestType,
    url: string,
    method: ApiMethod,
): Promise<ResponseType> {
    const session = await supabase.auth.getSession();

    if (session.error != null) {
        throw session.error;
    }

    const apiResponse = await axiosFetch<ResponseType, RequestType>({
        method,
        url,
        body: requestBody,
        authHeader: {
            Authorization: `Bearer ${session.data.session?.access_token}`,
        },
    });

    return apiResponse.data;
}
