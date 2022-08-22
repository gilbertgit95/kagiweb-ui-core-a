import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'


const AccountSettingsView = ({ accountInfo }) => {

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
                        title={ 'Settings A' }>
                        <KeyValueBlock
                            data={[
                                { key: 'settingsA1', value: 'value' },
                                { key: 'settingsA2', value: 'value' },
                                { key: 'settingsA3', value: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Settings B' }>
                        <KeyValueBlock
                            data={[
                                { key: 'settingsB1', value: 'value' },
                                { key: 'settingsB2', value: 'value' },
                                { key: 'settingsB3', value: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Settings C' }>
                        <KeyValueBlock
                            data={[
                                { key: 'settingsC1', value: 'value' },
                                { key: 'settingsC2', value: 'value' },
                                { key: 'settingsC3', value: '--' },
                                { key: 'settingsC4', value: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountSettingsView