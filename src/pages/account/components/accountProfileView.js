import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'

const AccountProfileView = ({ accountInfo }) => {
    let claims = {}

    if (accountInfo.accountClaims) {
        claims = accountInfo.accountClaims.reduce((acc, claim) => {
            acc[claim.key] = claim.value
            return acc
        }, {})
    }

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
                        title={ 'Basic Profile' }>
                        <Avatar
                            alt="Profile Picture"
                            src="/favicon.png"
                            sx={{ width: 200, height: 200 }} />
                        <KeyValueBlock
                            data={[
                                { key: 'First Name', value: claims.firstname? claims.firstname: '--' },
                                { key: 'Middle Name', value: claims.middlename? claims.middlename: '--' },
                                { key: 'Last Name', value: claims.lastname? claims.lastname: '--'},
                                { key: 'Nick Name', value: claims.nickname? claims.nickname: '--' },
                                { key: 'Gender', value: claims.gender? claims.gender: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Advance Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Nationality', value: claims.nationality? claims.nationality: '--' },
                                { key: 'Birth Date', value: claims.birthdate? claims.birthdate: '--' },
                                { key: 'Birth Place', value: claims.birthplace? claims.birthplace: '--' },
                                { key: 'Home Address', value: claims.homeaddress? claims.homeaddress: '--' },
                                { key: 'Personal Website', value: claims.personalwebsite? claims.personalwebsite: '--' },
                                { key: 'Bio', value: claims.bio? claims.bio: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={12} md={4}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Work Related Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Job Title', value: claims.companyrole? claims.companyrole: '--' },
                                { key: 'Company Name', value: claims.companyname? claims.companyname: '--' },
                                { key: 'Company Description', value: claims.companydesc? claims.companydesc: '--' },
                                { key: 'Industry Type', value: claims.companyindustry? claims.companyindustry: '--' },
                                { key: 'Contact Email', value: claims.companyemail? claims.companyemail: '--' },
                                { key: 'Contact Number', value: claims.companyphone? claims.companyphone: '--' },
                                { key: 'Company Website', value: claims.companywebsite? claims.companywebsite: '--' },
                                { key: 'Work Address', value: claims.companyaddress? claims.companyaddress: '--' }
                            ]}/>
                    </GenBlock>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountProfileView