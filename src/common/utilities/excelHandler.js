

const extractCSV = (data) => {
    return []
}

const extractXLS = (data) => {
    return []
}

const extractXLSX = (data) => {
    return []
}

const generateEmptyCells = (headers = [], count = 0) => {
    let data = []

    for (let i = 0; i < count; i++) {
        data.push(
            headers.reduce((acc, item) => {
                acc[item] = ''
                return acc
            }, {})
        )
    }

    return data
}

const extractFromPastedData = (e) => {
    let result = []

    try {
        const htmlData = e.clipboardData.getData("text/html")

        let node = new DOMParser()
            .parseFromString(htmlData, "text/html")
            .body.firstElementChild

        console.log(node)
    } catch (err) {
        console.log('Error while parsing Excel data', e)
    }

    return result
}

export default {
    extractCSV,
    extractXLS,
    extractXLSX,
    generateEmptyCells,
    extractFromPastedData
}