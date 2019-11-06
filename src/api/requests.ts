interface Requests {
    get<T>(id: string): Promise<T>;
    getList<T>(): Promise<T>;
}

const createRequests = (endpoint: string, fetcher: Function): Requests => ({
    get: <T>(id: string): Promise<T> =>
        fetcher({
            endpoint: `${endpoint}/${id}`,
            method: 'GET',
        }),
    getList: <T>(): Promise<T> =>
        fetcher({
            endpoint,
            method: 'GET',
        }),
});

export { createRequests };
