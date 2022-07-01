import { read, utils } from 'xlsx'

const xlsAndxSet = new Set([
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
])
const csvSet = new Set([
    'text/csv'
])

const toObjectList = (data) => {
    let result = []
    let headers = []

    data.forEach((items, index) => {
        if (index === 0) {
            headers = items
        } else {
            let datObj = {}
            items.forEach((item, itemIndex) => {
                datObj[headers[itemIndex]] = item
            })
            result.push(datObj)
        }
    })

    return result
}

const extractCSV = (str, delimiter = ',') => {
    const rows = str.split('\n')

    const arr = rows
        .filter(row => Boolean(row))
        .map(function (row) {
            return row
                .trim()
                .split(delimiter)
                .map(item => item.trim())
        })

    return toObjectList(arr)
}

const extractXlsOrXlsx = (fData) => {
    let workbook = read(fData, {
        type: 'binary'
    })

    let result = {}
    workbook.SheetNames.forEach((sheetName) => {
        let roa = utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1
        })
        if (roa.length) result[sheetName] = roa
    })
    
    // console.log(result)
    // return [0]
    return Object.values(result).reduce((acc, item) => {
        acc = [...acc, ...toObjectList(item)]
        return acc
    }, [])
}

const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            let r = new FileReader()
            r.onload = e => {
                let contents = null

                if (csvSet.has(file.type)) {
                    contents = extractCSV(e.target.result)
                }
                if (xlsAndxSet.has(file.type)) {
                    contents = extractXlsOrXlsx(e.target.result)
                }

                resolve(contents)
            }
            r.readAsBinaryString(file)
        } catch (err) {
            reject(err)
        }
    })
}

const extractExcel = async (e) => {
    let result = {
        data: [],
        error: [],
        success: []
    }
    for (let f of e.target.files) {
        // console.log(f.name, f)
        let name = f.name
        try {
            let data = await readExcelFile(f)
            result.data = [...result.data, ...data]
            result.success.push(name)
        } catch (err) {
            result.error.push(name)
        }
    }
    return result
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

const downloadTemplate = (headers, fileName = 'template') => {
    let csv = headers.join(',') + '\n';
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
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
    extractExcel,
    downloadTemplate,
    generateEmptyCells,
    extractFromPastedData
}