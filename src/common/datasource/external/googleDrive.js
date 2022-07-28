import axios from 'axios'

const aboutMeEndpoint = 'https://drive.google.com/uc?export=download&id=1ExOHxRVcOELeQ594J8FcK33Gnjmea4D5'
const fetchAboutMe = async () => {
    let resp =  await axios.request({
        url: aboutMeEndpoint,
        method: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'},
        contentType: 'text/plain'
    })

    return resp
}

export default {
    fetchAboutMe
}