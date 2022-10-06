import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import AccountContext from '../../../common/contexts/accountContext'
import PrimaryProfileBlock from '../../../common/blocks/primaryProfileBlock'
import KeyValueBlock from '../../../common/blocks/keyValueBlock'
import GenBlock from '../../../common/blocks/genBlock'

import StaticOptions from '../../../common/contexts/staticOptionsContext'

const AccountProfileView = ({ accountInfo }) => {
    const staticOptionsCtx = useContext(StaticOptions)
    let claims = {}

    if (accountInfo.accountClaims) {
        claims = accountInfo.accountClaims.reduce((acc, claim) => {
            acc[claim.key] = claim.value
            return acc
        }, {})
    }

    let countriesMap = staticOptionsCtx.staticOptionsContext.countries.list.reduce((acc, item) => {

        acc[item.alpha2] = item.name

        return acc
    }, {})

    let fullname = ''
    fullname += claims.firstname? claims.firstname: ''
    fullname += claims.middlename? ' ' + claims.middlename: ''
    fullname += claims.lastname? ' ' + claims.lastname: ''

    return (
        <>
            <Grid
                style={{ marginBottom: 20 }}
                container>
                <Grid
                    item xs={12}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Basic Profile' }>
                        {/* <Avatar
                            alt="Profile Picture"
                            src="/favicon.png"
                            sx={{ width: 200, height: 200 }} /> */}
                        <PrimaryProfileBlock
                            image={'/favicon.png'}
                            header={fullname? fullname: '--'}
                            subHeader={'Nickname: ' + (claims.nickname? claims.nickname: '--')}
                            subSubHeaders={['Gender: ' + (claims.gender? claims.gender: '--')]} />
                    </GenBlock>
                </Grid>

                <Grid
                    item xs={12} sm={6}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Advance Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Country', value: claims.country? countriesMap[claims.country]: '--' },
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
                    item xs={12} sm={6}
                    style={{ padding: 5 }}>
                    <GenBlock
                        isLoading={accountInfo.__isLoading}
                        title={ 'Work Related Profile' }>
                        <KeyValueBlock
                            data={[
                                { key: 'Job Title', value: claims.companyrole? claims.companyrole: '--' },
                                { key: 'Company Name', value: claims.companyname? claims.companyname: '--' },
                                { key: 'Company Country', value: claims.companycountry? countriesMap[claims.companycountry]: '--' },
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