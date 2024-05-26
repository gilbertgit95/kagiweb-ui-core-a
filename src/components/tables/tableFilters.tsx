import DebouncingTextField from '../inputs/debouncingTextField'

interface IProps<T> {
    searchValue?: string,
    searchFields?: string[],
    searchFieldsOption?: string[],

    filterFields?: string[],
    filterFieldsOption?: string[],

    sortValue?: 'asc' | 'dsc',
    sortFields?: string[],
    sortFieldsOption?: string[],

    data?: T[],
    onChange?: (filteredData:T[]) => void
}

export default function Tablefilters<T>({
    searchValue,
    searchFields,
    searchFieldsOption,

    filterFields,
    filterFieldsOption,

    sortValue,
    sortFields,
    sortFieldsOption,

    data,
    onChange
}:IProps<T>) {
    // text search:
    // - search value
    // - search fields - type: string[]
    // - search fields option - type: string[]

    // filter:
    // - filter fields - type: string[]
    // - filter fields option - type: string[]

    // sort:
    // - sort value - type: desc | asc
    // - sort fields - type: string[]
    // - sort fields option - type: string[]

    return (
        <>
            <DebouncingTextField
                size="small"
                delayedchange={(val) => {
                    console.log(val)
                }} />
        </>
    )
}