import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getJson<TResponse>(path: string): Promise<TResponse> {
    const response = await apiClient.get<TResponse>(path);

    return response.data;
}

export async function postJson<TRequest, TResponse>(
    path: string,
    payload: TRequest,
): Promise<TResponse> {
    const response = await apiClient.post<TResponse>(path, payload);

    return response.data;
}

export async function putJson<TRequest>(
    path: string,
    payload: TRequest,
): Promise<void> {
    await apiClient.put(path, payload);
}

export async function deleteJson(path: string): Promise<void> {
    await apiClient.delete(path);
}
