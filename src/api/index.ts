import { createFetcherJson } from './fetcher';
import { createRequests } from './requests';

const ENDPOINT: string = 'https://jsonplaceholder.typicode.com/todos';

const fetcher = createFetcherJson(window.fetch);
const request = createRequests(ENDPOINT, fetcher);

export const api = {
    get: (id: string) => request.get(id),
    getList: () => request.getList(),
};

