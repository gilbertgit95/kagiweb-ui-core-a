import React from 'react';
import { Typography, Stack, Divider } from '@mui/material'

interface IProps {
    items: string[]
}

const ListItems = (props:IProps) => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}>
            {
                props.items.map((item, key) => {
                    return (
                        <Typography key={key} color="primary" component="div" variant="caption">
                            { item }
                        </Typography>
                    )
                })
            }
        </Stack>
    )
}

export default ListItems