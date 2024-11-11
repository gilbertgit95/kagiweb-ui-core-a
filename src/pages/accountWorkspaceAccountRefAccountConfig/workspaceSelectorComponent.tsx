import React, { useState, useEffect } from 'react'

import { IAccount, IWorkspace } from '../../types/account'

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PersonIcon from '@mui/icons-material/Person';
import DropDownSearch from '../../components/inputs/dropdownSearch';

interface Props {
    accountData?: IAccount,
    defaultWorkspace?: IWorkspace,
    ownWorkspaces: IWorkspace[],
    externalWorkspaces: (IWorkspace & {ownerId:string, ownerNameId: string, ownerAccountType: string})[],
    anchorEl?: HTMLElement|null,
    style?:any,
    onSelect?: (selected:string) => void,
    onClose?: () => void
}

const WorkspaceSelectorComponent = ({
        accountData,
        defaultWorkspace,
        ownWorkspaces,
        externalWorkspaces,
        anchorEl,
        style,
        onSelect,
        onClose,
    }:Props) => {

    // const accountData = useAppSelector(state => state.signedInAccount?.accountData)
    // const defaultWorkspace = useAppSelector(state => state.signedInAccount?.workspace)
    // const ownWorkspaces = useAppSelector(state => state.signedInAccount?.workspaces) || []
    // const externalWorkspaces = useAppSelector(state => state.signedInAccount?.externalWorkspaces) || []

    const [workspaces, setWorkspaces] = useState<{key: string, label: string, subLabel?:string, Icon?:React.FC}[]>([])
    const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined)

    useEffect(() => {
        let workspaces = [
            ...ownWorkspaces.map(item => ({
                key: item._id || '',
                label: `${ item.name }`,
                subLabel: 'owned',
                Icon: accountData?.accountType === 'user'? PersonIcon: ScatterPlotIcon
            })),
            ...externalWorkspaces.map(item => ({
                key: item._id || '',
                label: item.name,
                subLabel: item.ownerNameId,
                Icon: item?.ownerAccountType === 'user'? PersonIcon: ScatterPlotIcon
            }))
        ]

        setWorkspaces(workspaces)
        setSelectedWorkspace(defaultWorkspace?._id)
        
    }, [defaultWorkspace, ownWorkspaces, externalWorkspaces])

    return (
        <DropDownSearch
            anchorEl={anchorEl}
            placeholder='Select Workspace'
            selected={selectedWorkspace}
            options={workspaces}
            style={style}
            onSelect={(sel) => {
                setSelectedWorkspace(sel)
                if (onSelect) onSelect(sel)
            }}
            onClose={() => {
                if (onClose) onClose()
            }} />
    )
}

export default WorkspaceSelectorComponent