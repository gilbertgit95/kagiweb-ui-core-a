import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const SelectBox = (props) => {
  const [age, setAge] = React.useState('')

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id='demo-select-small'>Role</InputLabel>
      <Select
        labelId='demo-select-small'
        id='demo-select-small'
        value={age}
        label='Role'
        onChange={handleChange}>
        <MenuItem value={10}>Super Admin</MenuItem>
        <MenuItem value={20}>Admin</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectBox