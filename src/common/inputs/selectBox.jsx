import React from 'react'

const SelectBox = (props) => {

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
                            <select
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
                                value={ props.value? props.value: '' }>
                                { props.children }
                            </select>
                        </td>
                        { props.postfix? <td>{ props.postfix }</td> : null }
                    </tr>
                </table>
            </fieldset>
        </div>
    )
}

export default SelectBox