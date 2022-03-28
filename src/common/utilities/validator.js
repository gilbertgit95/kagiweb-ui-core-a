import moment from 'moment'
 
/**
 * parameters:
 * - required -> should not be empty
 * - range    -> min, max, [inside, outside, ]
 * - regex    -> regular expression
 * - types    -> 
 *      number: int, float
 *      text: plain, username, email, password, name, phone, country
 *      date: moment.js as reference
 */

/**
 * {type, required, range, regex}
 * @param {*} params
 */
const check = (params) => {
    switch(params.type) {
        // for numbers
        case 'int':
            return checkInt(params)
        case 'float':
            return checkFloat(params)

        // for texts
        case 'plainText':
            return checkFloat(params)
        case 'username':
                return checkUsername(params)
        case 'email':
            return checkEmail(params)
        case 'password':
                return checkPassword(params)
        case 'name':
            return checkName(params)
        case 'phone':
                return checkPhone(params)
        case 'country':
            return checkCountry(params)

        // for date
        case 'date':
                return checkDate(params)

        default:
            return {error: 'Type is not recognize.'}
    }
}

// for handling numbers
const checkInt = ({type, required, range, regex}) => {
    
}
const checkFloat = ({type, required, range, regex}) => {
    
}

// for handling texts
const checkPlainText = ({type, required, range, regex}) => {

}
const checkUsername = ({type, required, range, regex}) => {

}
const checkEmail = ({type, required, range, regex}) => {

}
const checkPassword = ({type, required, range, regex}) => {

}
const checkName = ({type, required, range, regex}) => {

}
const checkPhone = ({type, required, range, regex}) => {

}
const checkCountry = ({type, required, range, regex}) => {

}


//  for handling dates
const checkDate = ({type, required, range, regex}) => {

}

export default {
    check,
    checkInt,
    checkPlainText,
    checkUsername,
    checkEmail,
    checkPassword,
    checkName,
    checkPhone,
    checkCountry,
    checkDate
}