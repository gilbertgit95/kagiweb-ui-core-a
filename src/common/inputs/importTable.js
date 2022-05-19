import { useState, useEffect } from 'react'

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
        header: [],
        data: []
    })

    useEffect(() => {
        // mounted
        (() => {

        })()

        // unmounted
        return () => {

        }
    }, [])

    return (
        <>
        </>
    )
}

export default ImportTable