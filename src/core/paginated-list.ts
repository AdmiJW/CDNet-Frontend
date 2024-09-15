export type PaginatedList<T> = {
    hasNext: boolean;
    hasPrevious: boolean;
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
};
