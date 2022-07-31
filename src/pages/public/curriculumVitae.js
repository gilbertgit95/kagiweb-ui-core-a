import { useState, useEffect, useRef, useContext } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import SecProfileBlock from '../../common/blocks/secondaryProfileBlock'
import PriProfileBlock from '../../common/blocks/primaryProfileBlock'
import BasicList from '../../common/lists/basicList'
import GenBlockComponent from '../../common/blocks/genBlock'

import PublicContext from '../../common/contexts/publicContext'

const CurriculumVitae = (props) => {
    const publicCtx = useContext(PublicContext)

    let [states, setStates] = useState({
        aboutMe: null,
        isLoading: true
    })

    useEffect(() => {
        if (!(publicCtx && publicCtx.publicContext && publicCtx.publicContext.aboutMe)) return
        // console.log('context: ', publicCtx.publicContext)
        setStates({...states, ...{
            aboutMe: publicCtx.publicContext.aboutMe,
            isLoading: false
        }})
    }, [publicCtx.publicContext])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={ styles.sectionStyle }>
                <PriProfileBlock
                    profilePic={ states.aboutMe? states.aboutMe.header.profilePic: '' }
                    fullName={ states.aboutMe? states.aboutMe.header.fullname: '' }
                    position={ states.aboutMe? states.aboutMe.header.workDesc: '' }
                    contacts={ states.aboutMe? states.aboutMe.header.links.map(item => item.value): [] } />
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Overview'
                    description={ states.aboutMe? states.aboutMe.overview: '' }>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Skills'>
                    <Grid container spacing={2}>
                        { states.aboutMe? states.aboutMe.skills.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={4} key={ index }>
                                    <SecProfileBlock
                                        title={ item.title }
                                        description={ item.desc }>
                                        <Box style={{ marginTop: 20 }}>
                                            <BasicList
                                                variant='unordered'
                                                colSize={{xs: 6, sm: 12}}
                                                list={ item.techs } />
                                        </Box>
                                    </SecProfileBlock>
                                </Grid>
                            )
                        }): null }
                    </Grid>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Experience'>
                    <Grid container spacing={2}>
                        { states.aboutMe? states.aboutMe.experience.map((item, index) => {
                            return (
                                <Grid item xs={12} key={ index }>
                                    <SecProfileBlock
                                        title={ item.title }
                                        subtitle={ `(${ item.year }) ${ item.position }` }
                                        description={ item.desc }
                                        links={ item.links } />
                                </Grid>
                            )
                        }): null }
                    </Grid>

                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Personal Projects'>
                    <Grid container spacing={2}>
                        { states.aboutMe? states.aboutMe.personalProjs.map((item, index) => {
                                return (
                                    <Grid item xs={12} md={6} key={ index }>
                                        <SecProfileBlock
                                            title={ item.title }
                                            subtitle={ `(${ item.year }) ${ item.subtitle }` }
                                            description={ item.desc }
                                            links={ item.links } />
                                    </Grid>
                                )
                        }): null }
                    </Grid>
                </GenBlockComponent>
            </Grid>

            <Grid item xs={12} style={ styles.sectionStyle }>
                <GenBlockComponent
                    title='Education'>
                        <Grid container spacing={2}>
                            { states.aboutMe? states.aboutMe.education.map((item, index) => {
                                    return (
                                        <Grid item xs={12} key={ index }>
                                            <SecProfileBlock
                                                title={ item.org }
                                                subtitle={ `(${ item.year }) ${ item.subtitle }` }
                                                description={ item.desc }
                                                links={ item.links } />
                                        </Grid>
                                    )
                            }): null }
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