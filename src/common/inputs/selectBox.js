import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const SelectBox = (props) => {
  const handleChange = (event) => {
    if (props.onChange) props.onChange(event.target.value)
  }

  return (
    <FormControl style={props.style? props.style: {}}>
      <InputLabel>{props.label? props.label: 'Select'}</InputLabel>
      <Select
        value={props.value? props.value: ''}
        label={props.label? props.label: 'Select'}
        onChange={handleChange}>
        {
          props.options? props.options.map((item, key) => {
            return <MenuItem key={ key } value={ item.value }>{ item.label }</MenuItem>
          }): null
        }
      </Select>
    </FormControl>
  )
}

export default SelectBox