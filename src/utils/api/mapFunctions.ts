export async function mapAndDoRequestPostPut<
    AppRequest,
    DomainRequest,
    DomainResponse,
    AppResponse,
>(
    body: AppRequest,
    inMapper: (appRequest: AppRequest) => DomainRequest,
    outMapper: (domainResponse: DomainResponse) => AppResponse,
    apiRequest: (domainRequest: DomainRequest) => Promise<DomainResponse>,
): Promise<AppResponse> {
    const mappedRequest = inMapper(body);
    const response = await apiRequest(mappedRequest);
    return outMapper(response);
}

export async function mapAndDoRequestGetDelete<DomainResponse, AppResponse>(
    outMapper: (body: DomainResponse) => AppResponse,
    apiRequest: () => Promise<DomainResponse>,
): Promise<AppResponse> {
    const response = await apiRequest();
    return outMapper(response);
}
