import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { Box, Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DebouncingTextField from '../inputs/debouncingTextField';

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
    onSelect?:(items:string[]) => void,
    enableSearch?: boolean
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
    const [filteredDir, setFilteredDir] = useState<IDir>()
    const [searchValue, setSearchValue] = useState<string>('')
    const inpuRef = useRef<HTMLInputElement>()

    const onClick = (parents:string[]) => {
        if (props.onSelect) {
            props.onSelect(parents)
        } else {
            setSelected(parents)
        }
    }

    const clearSearch = () => {
        if (inpuRef?.current?.value) inpuRef.current.value = ''
        setSearchValue('')
    }

    useEffect(() => {
        setSelected(props.selected || [])
    }, [props.selected])

    useEffect(() => {
        if (!props.directory) return
        const searchText = searchValue.toLowerCase()
        // reverse object dir to plain dir
        const reverseObject = reverseObjectGenerator(props.directory)
        // filter by search text
        const filteredData = reverseObject.filter(dir => {
            for (const route of dir) {
                const r = route.toLowerCase()
                if (r.indexOf(searchText) > -1) return true
            }

            return false
        })
        // generate object dir
        const obj = objectGenerator(filteredData)
        // set to filtered dir
        setFilteredDir(obj)
        // console.log(filteredData)
    }, [props.directory, searchValue])

    return (
        <Box
            sx={{
                paddingTop: '2px',
                paddingBottom: '10px',
            }}>
            {/* search box */}
            {
                props.enableSearch? (
                    <DebouncingTextField
                        size="small"
                        sx={{marginBottom: 1}}
                        inputRef={inpuRef}
                        delayedchange={val => {
                            setSearchValue(val)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CloseIcon
                                        onClick={clearSearch}
                                        sx={{cursor: 'pointer'}}/>
                                </InputAdornment>
                            ),
                        }}/>
                ): null
            }
            {/* tree view */}
            {
                RecursiveComponent({
                    ...filteredDir || {name: 'All', subDir: []},
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

const recursiveReverseObjectGenerator = (acc:(string[])[], objDir:IDir, parentDir:string[] = []) => {
    const dir:string[] = [...parentDir]

    dir.push(objDir.name)
    for (const subDir of objDir.subDir) {
        recursiveReverseObjectGenerator(acc, subDir, dir)
    }

    acc.push(dir)
}

const reverseObjectGenerator = (objDir:IDir):(string[])[] => {
    const plainDirs:(string[])[] = []

    for (const dir of objDir.subDir) {
        recursiveReverseObjectGenerator(plainDirs, dir, [])
    }

    return plainDirs
}

export {
    objectGenerator,
    reverseObjectGenerator
}
export default TreeDirectory