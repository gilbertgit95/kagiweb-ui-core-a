import React, { useState, useEffect } from 'react'
import DropDownSearch from '../../components/inputs/dropdownSearch';

import { IRole } from '../../types/role';

interface Props {
    defaultRole?: IRole,
    assignedRoles: IRole[],
    anchorEl?: HTMLElement|null,
    style?:any,
    onSelect?: (selected:string) => void,
    onClose?: () => void
}

const RoleSelectorComponent = ({
        defaultRole,
        assignedRoles,
        anchorEl,
        style,
        onSelect,
        onClose
    }:Props) => {

    // const defaultRole = useAppSelector(state => state.signedInAccount?.role)
    // const assignedRoles = useAppSelector(state => state.signedInAccount?.roles) || []

    const [roles, setRoles] = useState<{key: string, label: string, subLabel?:string, Icon?:React.FC}[]>([])
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)

    useEffect(() => {
        let options = assignedRoles.map(item => ({
            key: item._id || '',
            label: item.name,
            subLabel: item._id === defaultRole?._id? 'Current Selected': undefined
        }))

        setRoles(options)
        setSelectedRole(defaultRole?._id)
        
    }, [defaultRole, assignedRoles])

    return (
        <DropDownSearch
            anchorEl={anchorEl}
            placeholder='Select Role'
            selected={selectedRole}
            options={roles}
            style={style}
            onSelect={(sel) => {
                setSelectedRole(sel)
                if (onSelect) onSelect(sel)
            }}
            onClose={() => {
                if (onClose) onClose()
            }} />
    )
}

export default RoleSelectorComponent