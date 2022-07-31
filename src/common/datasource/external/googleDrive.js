import axios from 'axios'
import utils from '../../utilities'
import AboutMe_testData from './testData/aboutme .json'

const aboutMeEndpoint = 'https://drive.google.com/uc?export=download&id=1ExOHxRVcOELeQ594J8FcK33Gnjmea4D5'
const fetchAboutMe = async () => {
    // let resp =  await axios.request({
    //     url: aboutMeEndpoint,
    //     method: 'GET',
    //     headers: {
    //         'Accept': '*/*',
    //         'User-Agent': 'Thunder Client (https://www.thunderclient.com)'

    //     },
    //     contentType: 'text/plain'
    // })

    let resp = AboutMe_testData

    await utils.waitFor(2)

    // console.log('google drive: ', resp)

    return resp
    // return {}
}

export default {
    fetchAboutMe
}