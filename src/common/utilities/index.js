// import moment from 'moment'

const commonUtilities = {
    waitFor(sec) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), sec * 1e3)
        })
    }
}

export default commonUtilities