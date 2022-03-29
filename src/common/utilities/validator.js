import moment from 'moment'
 
/**
 * parameters:
 * - required -> should not be empty
 * - range    -> min, max, type[between, outside]
 * - regex    -> regular expression
 * - types    -> 
 *      number: int, float
 *      text: plain, username, email, password, name, phone, country
 *      date: moment.js as reference
 */

/**
 * {value, type, required, range, regex}
 * @param {*} params
 */
const check = (params) => {
    switch(params.type) {
        // for numbers
        case 'number':
            return checkNumber(params)
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
const checkNumber = ({value, type, required, range, regex}) => {
    // check value for the requirement
    if (required && (value === undefined || value === null)) return { error: 'value is required' }

    // check value is a type
    if (typeof value !== 'number') return { error: 'value is not a number' }

    // check value for the range
    // check is has min or max
    if (range && (range.hasOwnProperty('min') || range.hasOwnProperty('max'))) {
        let rangeTypesMap = new Set(['between', 'outside'])
        let rangeError = { error: 'value is out of range' }
        let rangeType = 'between'

        // assign range type
        if (range.type && rangeTypesMap.has(range.type)) rangeType = range.type

        // then check if it has only min
        if (   (range.hasOwnProperty('min') && typeof range.min === 'number')
            && !(range.hasOwnProperty('max') && typeof range.max === 'number')) {
            if (rangeType === 'between') {
                // check if the value is greater than or equal min
                if (!(value >= range.min)) return rangeError
            }
            if (rangeType === 'outside') {
                // check if value is less than or equal to min
                if (!(value <= range.min)) return rangeError
            }

        }
        // then check if it has only max
        if (   !(range.hasOwnProperty('min') && typeof range.min === 'number')
            && (range.hasOwnProperty('max') && typeof range.max === 'number')) {
            if (rangeType === 'between') {
                // check if values is less than or equal max
                if (!(value <= range.max)) return rangeError
            }
            if (rangeType === 'outside') {
                // check if value is greater than or equal max
                if (!(value >= range.max)) return rangeError
            }
        }
        // then check if it has both
        if (   (range.hasOwnProperty('min') && typeof range.min === 'number')
            && (range.hasOwnProperty('max') && typeof range.max === 'number')) {
            // then check if max greater than min
            if (range.max > range.min) {
                if (rangeType === 'between') {
                   // check if value is less than or equal max and greater than or equal to min
                   if (!(value <= range.max && value >= range.min)) return rangeError
                }
                if (rangeType === 'outside') {
                    // check if value is greater than or equal max and less than or equal to min
                    if (!(value >= range.max && value <= range.min)) return rangeError
                }
            // else means the minimum is greater than maximum
            } else {
                return { error: 'The minimum value is greater than maximum.' }
            }
        }
    }

    return
}
const checkInt = ({value, type, required, range, regex}) => {
    let numberCheckResult = checkNumber({value, type, required, range, regex})

    if (numberCheckResult) return numberCheckResult

    // check value is a integer
    if (value % 1) return { error: 'value is not integer' }

    return
}
const checkFloat = ({value, type, required, range, regex}) => {
    let numberCheckResult = checkNumber({value, type, required, range, regex})

    if (numberCheckResult) return numberCheckResult

    // check value is a integer
    if (!(value % 1)) return { error: 'value is a float' }

    return
}

// for handling texts
const checkPlainText = ({value, type, required, range, regex}) => {

}
const checkUsername = ({value, type, required, range, regex}) => {

}
const checkEmail = ({value, type, required, range, regex}) => {

}
const checkPassword = ({value, type, required, range, regex}) => {

}
const checkName = ({value, type, required, range, regex}) => {

}
const checkPhone = ({value, type, required, range, regex}) => {

}
const checkCountry = ({value, type, required, range, regex}) => {

}


//  for handling dates
const checkDate = ({value, type, required, range, regex}) => {

}

export default {
    check,
    checkNumber,
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