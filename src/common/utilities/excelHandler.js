

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

    let headers = []
    let tableData = []

    try {
        const htmlData = e.clipboardData.getData("text/html")

        let node = new DOMParser()
            .parseFromString(htmlData, "text/html")
            .body.firstElementChild

        let tbody = node.getElementsByTagName('tbody')[0]
        let trs = tbody.getElementsByTagName('tr')

        let trIndex = 0
        for (let tr of trs) {
            let tds = tr.getElementsByTagName('td')
            let rowData = {}
            let tdIndex = 0
            
            for (let td of tds) {
                let cellText = td.innerText
                if (trIndex === 0) {
                    headers.push(cellText)
                } else {
                    rowData[headers[tdIndex]] = cellText
                }
                tdIndex++
            }
            
            if (trIndex) tableData.push(rowData)
            trIndex++
        }

        // console.log(headers, tableData)

    } catch (err) {
        console.log('Error while parsing Excel data', e)
    }

    return { headers, tableData }
}

export default {
    extractCSV,
    extractXLS,
    extractXLSX,
    generateEmptyCells,
    extractFromPastedData
}