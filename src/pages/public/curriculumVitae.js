import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import SecProfileBlock from '../../common/blocks/secondaryProfileBlock'
import PriProfileBlock from '../../common/blocks/primaryProfileBlock'
import BasicList from '../../common/lists/basicList'
import GenBlockComponent from '../../common/blocks/genBlock'

const CurriculumVitae = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={ styles.sectionStyle }>
                <PriProfileBlock
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
                            <SecProfileBlock
                                title='Proficient'
                                description='In my current job and majority of my development today, I am using the following:'>
                                <Box style={{ marginTop: 20 }}>
                                    <BasicList
                                        variant='unordered'
                                        colSize={{xs: 6, sm: 12}}
                                        list={[
                                            'Javascript',
                                            'React',
                                            'NodeJS',
                                            'ExpressJS',
                                            'Sequelize',
                                            'MongoDB'
                                        ]} />
                                </Box>
                            </SecProfileBlock>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <SecProfileBlock
                                title='Familiar'
                                description='Some of my personal research and on my previous jobs I was using the following:'>
                                <Box style={{ marginTop: 20 }}>
                                    <BasicList
                                        variant='unordered'
                                        colSize={{xs: 6, sm: 12}}
                                        list={[
                                            'VueJS',
                                            'Meteor',
                                            'SQL Databases',
                                            'Azure App Services',
                                            'Python',
                                            'Golang'
                                        ]} />
                                </Box>
                            </SecProfileBlock>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <SecProfileBlock
                                title='Interests'
                                description='Unfotunately I am still a beginner in this fields:'>
                                <Box style={{ marginTop: 20 }}>
                                    <BasicList
                                        variant='unordered'
                                        colSize={{xs: 6, sm: 12}}
                                        list={[
                                            'C and C++',
                                            'Go with Tinygo',
                                            'React and React-native'
                                        ]} />
                                </Box>
                            </SecProfileBlock>
                        </Grid>
                    </Grid>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Experience'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SecProfileBlock
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
                        </Grid>

                        <Grid item xs={12}>
                            <SecProfileBlock
                                title='Detail Online Technology'
                                subtitle='(Dec 2019 - Present) Software Developer'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <SecProfileBlock
                                title='Samatosa'
                                subtitle='(Dec 2019 - Present) Software Developer'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                />
                        </Grid>
                    </Grid>

                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Personal Projects'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <SecProfileBlock
                                title='Server Basecode (Type A)'
                                subtitle='(Sep 2021 - Present) kagiweb-api-core-a'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                links={[
                                    {
                                        "label": "github",
                                        "value": "https://www.zilverband.com/"
                                    }
                                ]} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SecProfileBlock
                                title='Web UI Basecode (Type A)'
                                subtitle='(Sep 2021 - Present) kagiweb-ui-core-a'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                links={[
                                    {
                                        "label": "github",
                                        "value": "https://www.zilverband.com/"
                                    }
                                ]} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SecProfileBlock
                                title='Mobile Basecode (Type A)'
                                subtitle='(April 2022 - Present) kagiweb-mobile-core-a'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                links={[
                                    {
                                        "label": "github",
                                        "value": "https://www.zilverband.com/"
                                    }
                                ]} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SecProfileBlock
                                title='Treemap Generator'
                                subtitle='(April 2018 - June 2018) treemap'
                                description='Part of my job is to Maintain and Develop features of the main app and client internal apps. Scope of my responsibility range from the frontend development to Server-side.'
                                links={[
                                    {
                                        "label": "github",
                                        "value": "https://www.zilverband.com/"
                                    }
                                ]} />
                        </Grid>
                    </Grid>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Education'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <SecProfileBlock
                                    title='SDSSU'
                                    subtitle='(Dec 2012 - 2017) BS Computer Engineering'
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
                            </Grid>
                        </Grid>
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