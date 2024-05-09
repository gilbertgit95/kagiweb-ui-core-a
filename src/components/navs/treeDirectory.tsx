import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'

export interface IDir {
    name: string,
    subDir: IDir[]
}

export interface IRecursiveDir {
    name: string,
    subDir: IDir[],
    selected?: string[],
    parents?: string[],
    onClick?: (items:string[]) => void
}

interface IProps {
    directories?: IDir[],
    selected?: string[],
    onSelect?:(items:string[]) => void
}


const RecursiveComponent = (props:IRecursiveDir) => {
    const parents = [...(props.parents? props.parents: []), ...[props.name]]
    const isCurrentSelected = props.selected?.join('') === parents?.join('')

    return (
        <Box
            key={parents.join('_')}
            sx={{
                paddingLeft: '10px',
                borderLeft: '1px solid',
                borderLeftColor: 'primary.main'
            }}>
            <Button
                variant={isCurrentSelected? 'contained': 'text'}
                onClick={() => {
                    if (props.onClick) props.onClick(parents)
                }}>{ props.name }</Button>
            <Box
                sx={{
                    paddingLeft: '20px'
                }}>
                {
                    props.subDir.map(item => RecursiveComponent({
                        ...item,
                        ...{
                            parents,
                            selected: props.selected,
                            onClick: props.onClick
                        }
                    }))
                }
            </Box>
        </Box>
    )
}

const TreeDirectory = (props:IProps) => {
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        setSelected(props.selected || [])
    }, [props.selected])

    const onClick = (parents:string[]) => {
        if (props.onSelect) {
            props.onSelect(parents)
        } else {
            setSelected(parents)
        }
    }

    return (
        <Box
            sx={{
                paddingTop: '10px',
                paddingBottom: '10px',
            }}>
            {
                RecursiveComponent({
                    name: 'All',
                    subDir: props.directories || [],
                    selected,
                    onClick
                })
            }
        </Box>
    )
}

const recursiveObjectGenerator = (acc:IDir, dirs:string[]) => {
    const node = dirs.length? dirs.splice(0, 1)[0]: undefined
    if (node && acc.subDir.map(item => item.name).indexOf(node) === -1) {
        const objNode = {
            name: node,
            subDir: []
        }
        acc.subDir.push(objNode)
        if (dirs.length) recursiveObjectGenerator(objNode, dirs)
    }
}

const objectGenerator = (plainDirs:(string[])[]):IDir => {
    const result:IDir = {
        name: 'All',
        subDir: []
    }

    for (let dirs of plainDirs) {
        recursiveObjectGenerator(result, dirs)
    }

    return result
}

export {
    objectGenerator
}
export default TreeDirectory