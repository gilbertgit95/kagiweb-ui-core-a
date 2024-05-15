import { useState, useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
    directory?: IDir,
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
                size="small"
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
            <TextField
                size="small"
                sx={{marginBottom: 1}}
                onChange={e => {
                    console.log(e.target.value)
                }}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                 }}/>
            {
                RecursiveComponent({
                    ...props.directory || {name: 'All', subDir: []},
                    ...{
                        selected,
                        onClick
                    }
                })
            }
        </Box>
    )
}

const getObjectNode = (acc:IDir, name:string):IDir|undefined => {
    const index = acc.subDir.map(item => item.name).indexOf(name)
    if (index > -1) return acc.subDir[index]
    return
}

const recursiveObjectGenerator = (acc:IDir, dirs:string[]) => {
    const node = dirs.slice(0,1)[0]
    const newDirs = dirs.slice(1)

    if (node) {
        const objNode = getObjectNode(acc, node)
        const newObjNode = {
            name: node,
            subDir: []
        }

        if (objNode) {
            recursiveObjectGenerator(objNode, newDirs)
        } else {
            acc.subDir.push(newObjNode)
            recursiveObjectGenerator(newObjNode, newDirs)
        }
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