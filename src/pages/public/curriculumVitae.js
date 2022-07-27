import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import GenProfile from '../../common/blocks/genProfile'
import PrimaryProfileHeader from '../../common/blocks/primaryProfileHeader'
import BasicList from '../../common/lists/basicList'
import GenBlockComponent from '../../common/blocks/genBlock'

const CurriculumVitae = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={ styles.sectionStyle }>
                <PrimaryProfileHeader
                    profilePic='https://drive.google.com/uc?export=download&id=16F-YR8QbSHL6a_io95RfX1RyZUh9oyZB'
                    fullName='Gilbert D. Cuerbo'
                    position='Fullstack Javascript Developer'
                    contacts={['gilbert.cuerbo@gmail.com', '+639273854605']} />
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Overview'
                    description='As a modern farmer, my goal is to be able to create technologies
                    for different platforms. To make life easier with positive impact
                    to the environment. To enhance communities and Environment by
                    developing technologies that will replace methods that are harmful or
                    destructive to humanity.'>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Skills'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography
                                style={{ fontWeight: 700 }}
                                color='primary'
                                component='div' variant='overline'>
                                Proficient
                            </Typography>
                            <Typography
                                style={{ marginBottom: 20 }}
                                component='div' variant='body2'>
                                Currently I am using the following:
                            </Typography>
                            <BasicList variant='unordered' colSize={{xs: 6, sm: 12}}
                                list={[
                                    'Javascript',
                                    'React',
                                    'NodeJS',
                                    'ExpressJS',
                                    'Sequelize',
                                    'MongoDB'
                                ]} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography
                                style={{ fontWeight: 700 }}
                                color='primary'
                                component='div' variant='overline'>
                                Familiar
                            </Typography>
                            <Typography
                                style={{ marginBottom: 20 }}
                                component='div' variant='body2'>
                                For personal research and on my previous jobs I was using the following:
                            </Typography>
                            <BasicList variant='unordered' colSize={{xs: 6, sm: 12}}
                                list={[
                                    'VueJS',
                                    'Meteor',
                                    'SQL Databases',
                                    'Azure App Services',
                                    'Python',
                                    'Golang'
                                ]} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography
                                style={{ fontWeight: 700 }}
                                color='primary'
                                component='div' variant='overline'>
                                Interests
                            </Typography>
                            <Typography
                                style={{ marginBottom: 20 }}
                                component='div' variant='body2'>
                                I was always interested in small gadgets like IOT and Mobile devices, unfotunately I'm still a beginner. For platforms like this, I prefer to use the following:
                            </Typography>
                            <BasicList variant='unordered' colSize={{xs: 6, sm: 12}}
                                list={[
                                    'C and C++',
                                    'Go with Tinygo',
                                    'React and React-native'
                                ]} />
                        </Grid>
                    </Grid>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Experience'>
                    <GenProfile
                        title='Zilverband'
                        subtitle='(Dec 2019 - Present) Software Developer'
                        description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                        links={[
                            {
                                "label": "website",
                                "value": "https://www.zilverband.com/"
                            },
                            {
                                "label": "facebook",
                                "value": "https://www.facebook.com/Zilverband-1527875537425399/"
                            }
                        ]} />

                    <GenProfile
                        title='Detail Online Technology'
                        subtitle='(Dec 2019 - Present) Software Developer'
                        description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                        />

                    <GenProfile
                        title='Samatosa'
                        subtitle='(Dec 2019 - Present) Software Developer'
                        description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                        />
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Personal Projects'>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Education'>
                </GenBlockComponent>
            </Grid>
        </Grid>
    )
}

const styles = {
    sectionStyle: {
        marginBottom: 20
    }
}

export default CurriculumVitae