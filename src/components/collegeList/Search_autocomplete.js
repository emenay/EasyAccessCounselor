import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import axios from 'axios'
import getCollegeNamesLocal from './us_institutions'

const filter = createFilterOptions()
// this addToGrid function is from Search_college.js
export default function Search_autocomplete({ addToGrid, sync }) {
  const [value, setValue] = React.useState(null)

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        return filtered
      }}
      selectOnFocus
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={universitiesNameLocal}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.institution
      }}
      renderOption={(props, option) => (
        <li style={{ color: 'gray' }} {...props} key={option.key}>
          {option.institution}
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <div>
          <TextField
            {...params}
            style={{ position: 'relative', left: '25%', width: '50%' }}
            label=""
          />
          <Button
            variant="outlined"
            color="success"
            style={{ position: 'absolute', right: '150px' }}
            onClick={async () => {
              let listToAdd = await setUniversities(value)
              // console.log(listToAdd)
              addToGrid(listToAdd)
            }}>
            search
          </Button>
          <Button
            variant="outlined"
            style={{ position: 'absolute', right: '62px' }}
            onClick={sync}>
            add
          </Button>
          <br />
          <br />
        </div>
      )}
    />
  )
}

async function setUniversities(college) {
  // console.log(college)
  let res = await axios.get(
    'https://collegerestapijs.herokuapp.com/colleges/name?name=' +
      college.institution.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
  )
  return res.data[0]
}

const universitiesNameLocal = getCollegeNamesLocal()
// const university = [
//   {
//     college_name: 'University of North Carolina at Chapel hill',
//     state: 'NC',
//     type: 'public',
//   },
// ]
