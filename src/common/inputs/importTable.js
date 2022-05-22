import { useState, useEffect } from 'react'

import HorizontalStepsNav from '../navs/horizontalStepsNav'

// - import excel through copy paste
// - import excel through upload
// - option to create table

// - create table from clipboard
// * edit and evaluation mode
// * create editable table
// * editable column
// * editable row
// * dragable column
// * dragable row
// * add/remove column
// * add/remove row

const ImportTable = (props) => {
    const tableData = useState({
        header: ['Endpoint', 'Name', 'Type', 'Category', 'Subcategory'],
        data: []
    })
    const steps = ['Import Data', 'Modify Data', 'Evaluate and Save']

    return (
        <HorizontalStepsNav />
    )
}

export default ImportTable