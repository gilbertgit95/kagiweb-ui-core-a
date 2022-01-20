import React from 'react'

const TextField = (props) => {

    let type = props.type? props.type: 'text'

    const renderInput = (inputType) => {
        if (inputType == 'text') {
            return (
                <input
                    style={{
                        fontSize: 14,
                        border: 'none',
                        outline: 'none',
                        margin: 5,
                        width: '100%',
                        background: 'transparent',
                        color: 'gray'
                    }}
                    disabled={typeof props.disabled == 'boolean'? props.disabled: false}
                    onChange={typeof props.onChange == 'function'? props.onChange: e => {}}
                    placeholder={ props.placeholder? props.placeholder: '' }
                    value={ props.value? props.value: '' }
                    type='text' />
            )
        }

        if (inputType == 'textarea') {
            return (
                <textarea
                    style={{
                        fontSize: 14,
                        border: 'none',
                        outline: 'none',
                        margin: 5,
                        width: '100%',
                        background: 'transparent',
                        color: 'gray'
                    }}
                    rows={props.rows? props.rows: 1}
                    disabled={typeof props.disabled == 'boolean'? props.disabled: false}
                    onChange={typeof props.onChange == 'function'? props.onChange: e => {}}
                    placeholder={ props.placeholder? props.placeholder: '' }
                    value={ props.value? props.value: '' }>
                </textarea>
            )
        }

        return null
    }

    return (
        <div 
            style={{
                ...{display: 'inline-block'},
                ...(props.style? props.style: {})
            }}>
            <fieldset
                style={{
                    padding: 10,
                    paddingTop: 0,
                    borderRadius: 5,
                    border: '1px solid #ccc'
                }}>
                {
                    props.legend? (
                        <legend
                            style={{
                                fontSize: 14,
                                fontWeight: 300,
                                border: 'none',
                                color: 'gray'
                            }}>{ props.legend? props.legend: '' }</legend>
                    ): null
                }
                
                <table style={{ border: 'none' }}>
                    <tr>
                        { props.prefix? <td>{ props.prefix }</td> : null }
                        <td style={{ border: 'none' }}>
                            { renderInput(type) }
                        </td>
                        { props.postfix? <td>{ props.postfix }</td> : null }
                    </tr>
                </table>
            </fieldset>
        </div>
    )
}

export default TextField