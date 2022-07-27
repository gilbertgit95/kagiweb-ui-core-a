import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import PrimaryProfileHeader from '../../common/blocks/primaryProfileHeader'
import BasicList from '../../common/lists/basicList'
import GenBlockComponent from '../../common/blocks/genBlock'

const CurriculumVitae = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PrimaryProfileHeader
                    profilePic='https://drive.google.com/uc?export=download&id=16F-YR8QbSHL6a_io95RfX1RyZUh9oyZB'
                    fullName='Gilbert D. Cuerbo'
                    position='Fullstack Javascript Developer'
                    contacts={['gilbert.cuerbo@gmail.com', '+639273854605']} />
            </Grid>

            <Grid item xs={12}>
                <GenBlockComponent
                    title='Overview'
                    description='As a modern farmer, my goal is to be able to create technologies
                    for different platforms. To make life easier with positive impact
                    to the environment. To enhance communities and Environment by
                    developing technologies that will replace methods that are harmful or
                    destructive to humanity.'>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={12}>
                <GenBlockComponent
                    title='Experience'>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12}>
                <GenBlockComponent
                    title='Personal Projects'>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12}>
                <GenBlockComponent
                    title='Education'>
                </GenBlockComponent>
            </Grid>
        </Grid>
    )
}

export default CurriculumVitae