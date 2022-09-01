import { useState, useEffect,useContext } from 'react'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
// import VerticalSteps from '../../../common/navs/verticalSteps'
// import LoadingButton from '../../../common/buttons/loadingButton'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'

const AccountView = ({ accountInfo }) => {

    return (
        <>
            <Grid
                style={{ marginBottom: 20 }}
                container>
                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Base Credentials' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Username', value: accountInfo.username? accountInfo.username: '--' },
                                { key: 'Type', value: accountInfo.role && accountInfo.role.name? accountInfo.role.name: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Emails Adresses' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Primary', value: accountInfo.primaryEmail? accountInfo.primaryEmail: '--' },
                                { key: 'Secondary', value: accountInfo.secondaryEmail? accountInfo.secondaryEmail: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Phone Numbers' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Primary', value: accountInfo.primaryNumber? accountInfo.primaryNumber: '--' },
                                { key: 'Secondary', value: accountInfo.secondaryNumber? accountInfo.secondaryNumber: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountView