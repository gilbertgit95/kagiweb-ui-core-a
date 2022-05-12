import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'

const AccountProfileView = (props) => {
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
                        title={ 'Basic Profile' }>
                        <Avatar
                            alt="Profile Picture"
                            src="/favicon.png"
                            sx={{ width: 200, height: 200 }} />
                        <KeyValueBlock
                            data={[
                                { key: 'First Name', value: 'Gilbert' },
                                { key: 'Middle Name', value: 'Defante' },
                                { key: 'Last Name', value: 'Cuerbo' },
                                { key: 'Nick Name', value: 'Berto' },
                                { key: 'Gender', value: 'Male' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={isLoading}
                        title={ 'Advance Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Nationality', value: 'Filipino' },
                                { key: 'Birth Date', value: 'April 27, 1995' },
                                { key: 'Birth Place', value: 'Cantilan, Surigao del Sur' },
                                { key: 'Home Address', value: 'Pagantayan, Cantilan, Surigao del Sur' },
                                { key: 'Personal Website', value: 'https://gilbertgit95.github.com' },
                                { key: 'Bio', value: 'lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={isLoading}
                        title={ 'Work Related Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Job Title', value: 'Sorfware Developer' },
                                { key: 'Company Name', value: 'Kagiweb' },
                                { key: 'Company Description', value: 'lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem' },
                                { key: 'Industry Type', value: 'Information Technology' },
                                { key: 'Contact Email', value: 'kagiweb@gmail.com' },
                                { key: 'Contact Number', value: '09273854600' },
                                { key: 'Company Website', value: 'https://gilbertgit95.github.com/kagiweb' },
                                { key: 'Work Address', value: 'Cantilan, Surigao del Sur' }
                            ]}/>
                    </GenBlock>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountProfileView