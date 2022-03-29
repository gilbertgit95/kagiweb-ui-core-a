import validator from './validator'

test('checkNumber string value will get an error: ', () => {
    let dataNotNumber = {
        value: 'test',
        type: 'int',
        required: true,
        range: {min: 0, max: 10, type: 'between'},
        regex: null
    }

    let dataNotNumberResult = validator.checkNumber(dataNotNumber)

    expect(Boolean(dataNotNumberResult.error)).toBe(true)
})

test('checkNumber ranges test', () => {
    let dataRange = {
        value: -2,
        type: 'int',
        required: true,
        range: {min: 0, max: 10, type: 'between'},
        regex: null
    }
    let dataRange2 = {
        value: 1,
        type: 'int',
        required: true,
        range: {min: 0, max: 10, type: 'between'},
        regex: null
    }

    // let dataRange3 = {
    //     value: -2,
    //     type: 'int',
    //     required: true,
    //     range: {min: 0, max: 10, type: 'outside'},
    //     regex: null
    // }
    // let dataRange4 = {
    //     value: 1,
    //     type: 'int',
    //     required: true,
    //     range: {min: 0, max: 10, type: 'outside'},
    //     regex: null
    // }

    let dataRangeResult = validator.checkNumber(dataRange)
    let dataRangeResult2 = validator.checkNumber(dataRange2)

    // let dataRangeResult3 = validator.checkNumber(dataRange3)
    // let dataRangeResult4 = validator.checkNumber(dataRange4)

    expect(Boolean(dataRangeResult.error)).toBe(true)
    expect(Boolean(dataRangeResult2)).toBe(false)

    // expect(Boolean(dataRangeResult3)).toBe(true)
    // expect(Boolean(dataRangeResult4.error)).toBe(true)
})