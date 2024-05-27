import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <DebouncingTextField
                size="small"
                delayedchange={(val) => {
                    console.log(val)
                }} />
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </>
    )
}