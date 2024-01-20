export interface IPagination<T> {
    items: T[],
    nextURL: string | null,
    page: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
}