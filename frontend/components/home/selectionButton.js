import {Select, MenuItem} from '@mui/material'

export default function SelectionButton() {
  return (
    <Select
      sx={{
        width: '43.98%',
        height: '13.29%',
        borderRadius: '28px',
        border: '8px solid var(--grey, #D1E4EE)',
        background: '#FFF',
      }}
    >
      <MenuItem></MenuItem>
      <MenuItem></MenuItem>
    </Select>
  )
}
