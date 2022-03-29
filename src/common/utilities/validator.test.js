import {
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
} from './validator'

test('Check number: ', () => {
    let dataNotNumber = {
        value: 'test',
        type: 'int',
        required: true,
        range: {min: 0, max: 10, type: 'between'},
        regex: null
    }

    let dataNotNumberResult = checkNumber(dataNotNumber)

    expect(Boolean(dataNotNumberResult.error)).toBe(true)
})