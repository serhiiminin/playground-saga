interface RequestParams {
    endpoint: string;
    method: string;
    headers?: object;
    body?: object;
}

const checkStatus = (response: Response): Response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.statusText);
};

const parseJson = <T>(response: Response): Promise<T> => response.json();

type F = (params: Request) => Promise<Response>;
type FN = <T>(params: RequestParams) => Promise<T>;

const createFetcherJson = (fetcher: F): FN => <T>(params: RequestParams): Promise<T> => {
    const { endpoint = '', body, headers, ...restParams } = params;
    const request = new Request(endpoint, {
        body: JSON.stringify(body),
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        }),
        ...restParams,
    });

    return fetcher(request)
        .then(checkStatus)
        .then((response: Response): Promise<T> => parseJson<T>(response));
};

export { createFetcherJson };
