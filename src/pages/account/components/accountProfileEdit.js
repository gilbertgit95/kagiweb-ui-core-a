import React, { useState, useEffect, useRef, useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import StaticOptions from '../../../common/contexts/staticOptionsContext'
import AccountContext from '../../../common/contexts/accountContext'
import GlobalDialogContext from '../../../common/contexts/globalDialogContext'
import VerticalSteps from '../../../common/navs/verticalStepsNav'
import RadioList from '../../../common/inputs/radioList'
import DebouncingSeachSelect from '../../../common/inputs/debouncingSeachSelect'
import utils from '../../../common/utilities'

const AccountProfileEdit = ({accountInfo, onSaveData}) => {
    const accountClaimsMap = accountInfo && accountInfo.accountClaims? accountInfo.accountClaims.reduce((acc, item) => {
        acc[item.key] = item
        return acc
    }, {}): {}

    const [ states, setStates ] = useState({
        gender: accountClaimsMap && accountClaimsMap.gender? accountClaimsMap.gender.value: 'male'
    })
    const dialogCtx = useContext(GlobalDialogContext)
    const staticOptionsCtx = useContext(StaticOptions)

    const profilepictureRef = useRef()
    const genderRef = useRef()
    const nicknameRef = useRef()
    const firstnameRef = useRef()
    const middlenameRef = useRef()
    const lastnameRef = useRef()

    const countryRef = useRef()
    const nationalityRef = useRef()
    const birthdateRef = useRef()
    const birthplaceRef = useRef()
    const homeaddressRef = useRef()
    const personalwebsiteRef = useRef()
    const bioRef = useRef()

    const companyroleRef = useRef()
    const companynameRef = useRef()
    const companydescRef = useRef()
    const companycountryRef = useRef()
    const companyindustryRef = useRef()
    const companyemailRef = useRef()
    const companyphoneRef = useRef()
    const companywebsiteRef = useRef()
    const companyaddressRef = useRef()

    const steps = [
        {
            icon: null,
            title: 'Basic Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={{...styles.grid, ...{ textAlign: '-webkit-center', margin: 'auto'}}}>
                        <Avatar
                            alt="Profile Picture"
                            src="/favicon.png"
                            sx={{ width: 200, height: 200 }} />
                        <input
                            accept=".jpg, .png, .jpeg, .gif, .bmp"
                            ref={profilepictureRef}
                            type="file"
                            hidden />
                        <Button
                            color='primary'
                            variant='outlined'
                            onClick={() => {
                                if (profilepictureRef && profilepictureRef.current) {
                                    profilepictureRef.current.click()
                                }
                            }}
                            style={{ marginTop: 30 }}
                            startIcon={ <FileUploadIcon /> }>
                            Upload Image
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <Typography
                            color='primary'
                            style={{...styles.fields, ...{ marginTop: 15 }}}
                            variant='body1'>
                            Gender
                        </Typography>
                        <Box style={{ padding: 30, paddingTop: 15 }}>
                            <RadioList
                                radioListName='Gender'
                                onChange={(e) => {
                                    // console.log('selectedt: ', e)
                                    setStates({...states, ...{ gender: e.key }})
                                }}
                                selected={states.gender}
                                colSize={{xs: 6}}
                                list={[
                                    { disabled: false, key: 'male', label: 'Male'},
                                    { disabled: false, key: 'female', label: 'Female'}
                                ]} />
                        </Box>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={nicknameRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.nickname? accountClaimsMap.nickname.value: ''}
                            label="Nick Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={firstnameRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.firstname? accountClaimsMap.firstname.value: ''}
                            label="First Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={middlenameRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.middlename? accountClaimsMap.middlename.value: ''}
                            label="Middle Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={lastnameRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.lastname? accountClaimsMap.lastname.value: ''}
                            label="Last Name" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Basic Profile')

                let inputData = await dialogCtx.showDialog({
                    type: 'confirm',
                    title: 'Confirmation',
                    message: 'This will update your profile data. Do you want to proceed?',
                    color: 'secondary'
                })
                if (inputData.status !== 'proceed') return false

                let actionType = 'changeBasicInfo'

                // let profilepicture = profilepictureRef.current.value? profilepictureRef.current.value: ''
                // let gender = genderRef.current.value? genderRef.current.value: ''
                let nickname = nicknameRef.current.value? nicknameRef.current.value: ''
                let firstname = firstnameRef.current.value? firstnameRef.current.value: ''
                let middlename = middlenameRef.current.value? middlenameRef.current.value: ''
                let lastname = lastnameRef.current.value? lastnameRef.current.value: ''

                await onSaveData({
                    actionType,
                    // profilepicture,
                    gender: states.gender,
                    nickname,
                    firstname,
                    middlename,
                    lastname
                })
                return true
            }
        },
        {
            icon: null,
            title: 'Advance Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <DebouncingSeachSelect
                            fullWidth
                            items={
                                staticOptionsCtx.staticOptionsContext.countries.list.map(item => {
                                    return {
                                        label: item.name,
                                        value: item.alpha2
                                    }
                                })
                            }
                            selected={'test1'}
                            style={styles.fields} />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={nationalityRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.nationality? accountClaimsMap.nationality.value: ''}
                            label="Nationality" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={birthdateRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.birthdate? accountClaimsMap.birthdate.value: ''}
                            label="Birth Date" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={birthplaceRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.birthplace? accountClaimsMap.birthplace.value: ''}
                            label="Birth Place" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            rows={2}
                            multiline
                            fullWidth
                            inputRef={homeaddressRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.homeaddress? accountClaimsMap.homeaddress.value: ''}
                            label="Home Address" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={personalwebsiteRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.personalwebsite? accountClaimsMap.personalwebsite.value: ''}
                            label="Personal Website" />
                        <TextField
                            style={styles.fields}
                            rows={3}
                            multiline
                            fullWidth
                            inputRef={bioRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.bio? accountClaimsMap.bio.value: ''}
                            label="Bio" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Advance Profile')
                let inputData = await dialogCtx.showDialog({
                    type: 'confirm',
                    title: 'Confirmation',
                    message: 'This will update your profile data. Do you want to proceed?',
                    color: 'secondary'
                })
                if (inputData.status !== 'proceed') return false

                let actionType = 'changeAdvanceInfo'

                // let country = countryRef.current.value? countryRef.current.value: ''
                let nationality = nationalityRef.current.value? nationalityRef.current.value: ''
                let birthdate = birthdateRef.current.value? birthdateRef.current.value: ''
                let birthplace = birthplaceRef.current.value? birthplaceRef.current.value: ''
                let homeaddress = homeaddressRef.current.value? homeaddressRef.current.value: ''
                let personalwebsite = personalwebsiteRef.current.value? personalwebsiteRef.current.value: ''
                let bio = bioRef.current.value? bioRef.current.value: ''

                await onSaveData({
                    actionType,
                    // country,
                    nationality,
                    birthdate,
                    birthplace,
                    homeaddress,
                    personalwebsite,
                    bio
                })
                return true
            }
        },
        {
            icon: null,
            title: 'Work Related Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companyroleRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyrole? accountClaimsMap.companyrole.value: ''}
                            label="Job Title" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companynameRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyname? accountClaimsMap.companyname.value: ''}
                            label="Company Name" />
                        <TextField
                            style={styles.fields}
                            rows={5}
                            multiline
                            fullWidth
                            inputRef={companydescRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companydesc? accountClaimsMap.companydesc.value: ''}
                            label="Company Description" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companyindustryRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyindustry? accountClaimsMap.companyindustry.value: ''}
                            label="Industry Type" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companyemailRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyemail? accountClaimsMap.companyemail.value: ''}
                            label="Contact Email" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companyphoneRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyphone? accountClaimsMap.companyphone.value: ''}
                            label="Contact Number" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            inputRef={companywebsiteRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companywebsite? accountClaimsMap.companywebsite.value: ''}
                            label="Company Website" />
                        <TextField
                            style={styles.fields}
                            rows={2}
                            multiline
                            fullWidth
                            inputRef={companyaddressRef}
                            defaultValue={accountClaimsMap && accountClaimsMap.companyaddress? accountClaimsMap.companyaddress.value: ''}
                            label="Work Address" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Work Related Profile')

                let inputData = await dialogCtx.showDialog({
                    type: 'confirm',
                    title: 'Confirmation',
                    message: 'This will update your profile data. Do you want to proceed?',
                    color: 'secondary'
                })
                if (inputData.status !== 'proceed') return false

                let actionType = 'changeWorkInfo'

                let companyrole = companyroleRef.current.value? companyroleRef.current.value: ''
                let companyname = companynameRef.current.value? companynameRef.current.value: ''
                let companydesc = companydescRef.current.value? companydescRef.current.value: ''
                // let companycountry = companycountryRef.current.value? companycountryRef.current.value: ''
                let companyindustry = companyindustryRef.current.value? companyindustryRef.current.value: ''
                let companyemail = companyemailRef.current.value? companyemailRef.current.value: ''
                let companyphone = companyphoneRef.current.value? companyphoneRef.current.value: ''
                let companywebsite = companywebsiteRef.current.value? companywebsiteRef.current.value: ''
                let companyaddress = companyaddressRef.current.value? companyaddressRef.current.value: ''

                await onSaveData({
                    actionType,
                    companyrole,
                    companyname,
                    companydesc,
                    // companycountry,
                    companyindustry,
                    companyemail,
                    companyphone,
                    companywebsite,
                    companyaddress
                })
                return true
            }
        }
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <VerticalSteps
                    nextBtnLabel={ 'Save and Next' }
                    finishBtnlabel={ 'Save' }
                    finalBtnLabel={ 'Save Changes' }
                    disableLabelClick={ false }
                    views={ steps } />
            </Grid>
        </Grid>
    )
}

const styles = {
    grid: {
        paddingTop: 0
    },
    fields: {
        marginTop: 10
    }
}

export default AccountProfileEdit