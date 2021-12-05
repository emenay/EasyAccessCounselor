import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import axios from 'axios';

const filter = createFilterOptions()

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
      options={university}
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
        return option.college_name
      }}
      renderOption={(props, option) => (
        <li style={{ color: 'gray' }} {...props}>
          {option.college_name}
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
              let listToAdd = await setUniversities(value);
              console.log(listToAdd)
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

let universities = [];

async function setUniversities(college){
  console.log(college)
  let res = await axios.get("https://collegerestapijs.herokuapp.com/colleges/name?name=" + college.college_name.replace(/[^A-Za-z0-9]/g, '').toLowerCase())
  // console.log(res.data);
  let curr = {college_name: '', state: '', type: '',};
  // curr.college_name = 
  universities = res.data[0];
  // console.log(universities)
  return universities
}

const university = [
  {
    college_name: 'University of North Carolina at Chapel hill',
    state: 'NC',
    type: 'public',
  },
  {
    college_name: 'Stanford University',
    state: 'CA',
    type: 'private',
  },
  {
    college_name: 'University of California, Los Angeles',
    state: 'CA',
    type: 'public',
  },
  {
    college_name: 'Harvard University',
    state: 'MA',
    type: 'private',
  },
  {
    college_name: 'Cornell University',
    state: 'NY',
    type: 'private',
  },
  {
    college_name: 'Duke University',
    state: 'NC',
    type: 'private',
  },
  {
    college_name: 'NC State University',
    state: 'NC',
    type: 'public',
  },
  {
    college_name: 'Columbia University',
    state: 'NY',
    type: 'private',
  },
  {
    college_name: 'The University of Chicago',
    state: 'IL',
    type: 'private',
  },
  {
    college_name: 'Yale University',
    state: 'CT',
    type: 'private',
  },
  {
    college_name: 'American University',
    state: 'DC',
    type: 'private',
  },
  {
    college_name: 'University of Michigan, Ann Arbor',
    state: 'MI',
    type: 'public',
  },
  {
    college_name: 'University of Florida',
    state: 'FL',
    type: 'public',
  },
]

