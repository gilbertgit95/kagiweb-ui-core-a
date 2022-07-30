import axios from 'axios'

const aboutMeEndpoint = 'https://drive.google.com/uc?export=download&id=1ExOHxRVcOELeQ594J8FcK33Gnjmea4D5'
const fetchAboutMe = async () => {
    let resp =  await axios.request({
        url: aboutMeEndpoint,
        method: 'GET',
        headers: {
            'Accept': '*/*'
        },
        contentType: 'text/plain'
    })

    return resp
    // return {}
}

export default {
    fetchAboutMe
}