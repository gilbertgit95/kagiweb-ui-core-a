import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import RoleFeaturesListEditForm from './roleFeaturesListEditForm';
import RoleFeaturesGroupedEditForm from './roleFeaturesGroupedEditForm';
import { IRole } from '../../types/role';
import RoleService from '../role/roleService';
import AppUtils from '../../utils/appUtils';

const RoleFeaturesEditPage = () => {
    const { roleId } = useParams()
    let [searchParams] = useSearchParams()
    const view = searchParams.get('view')
    const viewTypes = ['list', 'grouped']
    const [viewType, setViewType] = useState<string|null>((new Set(viewTypes)).has(view || '')? view: viewTypes[0])
    const [role, setRole] = useState<IRole | undefined>()


    const reLoadRole = async () => {
        if (roleId) {
            try {
                const roleResp = await RoleService.getRole(roleId)
                setRole(roleResp.data)

                await AppUtils.loadAppRefsData()
            } catch (err:any) {
                // do nothing
            }
        }
    }

    useEffect(() => {
        const init = async () => {

            if (roleId) {
                try {
                    const roleResp = await RoleService.getRole(roleId)
                    setRole(roleResp.data)

                } catch (err:any) {
                    // do nothing
                }
            }
        }
        console.log('initiate role features edit page')
        init()
    }, [roleId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Role Features Update'} subtitle={ role?.name } />
                    <Divider />
                </Grid>
                {
                    viewType === 'list'? (
                        <RoleFeaturesListEditForm
                            role={role}
                            view={viewType || ''}
                            onChangeView={(vType) => {
                                setViewType(vType)
                                window.history.replaceState(null, '', `?view=${ vType }`)
                            }}
                            onChange={async () => {
                                await reLoadRole()
                            }} />
                    ): null
                }
                {
                    viewType === 'grouped'? (
                        <RoleFeaturesGroupedEditForm
                            role={role}
                            view={viewType || ''}
                            onChangeView={(vType) => {
                                setViewType(vType)
                                window.history.replaceState(null, '', `?view=${ vType }`)
                            }}
                            onChange={async () => {
                                await reLoadRole()
                            }} />
                    ): null
                }
            </Grid>
        </Container>
    )
}

export default RoleFeaturesEditPage