import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'


const AccountSettingsView = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        fetchData()
    }, [])

    return (
        <>
            <Grid
                style={{ marginBottom: 20 }}
                container>
                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={isLoading}
                        title={ 'Base Credentials' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Username', value: 'username101' },
                                { key: 'Type', value: 'Super Admin' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={isLoading}
                        title={ 'Emails Adresses' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Primary', value: 'test101@gmail.com' },
                                { key: 'Secondary', value: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={isLoading}
                        title={ 'Phone Numbers' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Primary', value: '+639273854600' },
                                { key: 'Secondary', value: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountSettingsView